import os
import uuid  
import json  
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import redis  

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)


try:
    redis_client = redis.Redis(host='127.0.0.1', port=6379, decode_responses=True)
    redis_client.ping()
    print("✅ Berhasil terhubung ke Redis!")
except redis.exceptions.ConnectionError as e:
    print(f"❌ Gagal terhubung ke Redis: {e}")
    print("Pastikan server Redis Anda sudah berjalan.")
    redis_client = None

SYSTEM_PROMPT = """
Anda adalah chatbot asisten administrasi virtual untuk program studi S1 Fakultas Teknologi Informasi (FTI) 
di Universitas Kristen Satya Wana (UKSW), Salatiga.

Tugas Anda adalah menjawab pertanyaan seputar FTI UKSW dengan akurat dan profesional.
Gunakan bahasa Indonesia yang formal, sopan, dan informatif.

Pengetahuan Anda mencakup:
- Pendaftaran Mahasiswa Baru (PMB): Jadwal, persyaratan, biaya, jalur pendaftaran.
- Kurikulum: Mata kuliah wajib dan pilihan, jumlah SKS untuk lulus, prasyarat mata kuliah.
- Prosedur Akademik: Cara mengisi KRS (Kartu Rencana Studi), melihat KHS (Kartu Hasil Studi), pendaftaran skripsi, dan Kerja Praktik (KP).
- Informasi Umum: Lokasi gedung FTI, nama-nama dosen dan staf penting, kontak Tata Usaha (TU).

Batasan Anda:
- JANGAN PERNAH memberikan informasi pribadi mahasiswa (seperti nilai, IPK, status pembayaran, dll).
- Jika pertanyaan menyangkut data pribadi atau memerlukan akses ke sistem internal, arahkan pengguna dengan sopan untuk:
  1. Login ke sistem informasi akademik resmi UKSW (SIASAT).
  2. Menghubungi langsung bagian Tata Usaha (TU) FTI.
- Jangan menjawab pertanyaan di luar konteks FTI UKSW. Jika ada, nyatakan dengan sopan bahwa Anda hanya fokus pada informasi FTI UKSW.

Selalu berikan jawaban yang jelas dan terstruktur.
"""

@app.route('/start_chat', methods=['POST'])
def start_chat():
    """
    Endpoint untuk memulai sesi chat baru.
    Membuat ID sesi yang unik dan mengirimkannya kembali ke frontend.
    """
    session_id = f"chat_session:{uuid.uuid4()}"
    return jsonify({"session_id": session_id})

@app.route('/chat', methods=['POST'])
def chat():
    """
    Endpoint utama untuk memproses pesan dari pengguna.
    """
    if not redis_client:
        return jsonify({"error": "Layanan penyimpanan (Redis) tidak tersedia."}), 503

    data = request.json
    if not data or 'message' not in data or 'session_id' not in data:
        return jsonify({"error": "Input tidak valid. Harap sertakan 'session_id' dan 'message'."}), 400

    session_id = data['session_id']
    user_message = data['message']

    try:
        raw_history = redis_client.get(session_id)
        history = json.loads(raw_history) if raw_history else []
        model = genai.GenerativeModel('gemini-2.5-flash')
        chat_session = model.start_chat(history=history)
        full_prompt = f"{SYSTEM_PROMPT}\n\nPertanyaan Pengguna: \"{user_message}\"\n\nJawaban Anda:"
        response = chat_session.send_message(full_prompt)
        bot_reply = response.text
        updated_history = [
            {'role': entry.role, 'parts': [{'text': part.text} for part in entry.parts]}
            for entry in chat_session.history
        ]
        redis_client.set(session_id, json.dumps(updated_history))
        redis_client.expire(session_id, 86400)

        return jsonify({"reply": bot_reply})

    except Exception as e:
        print(f"Error pada session {session_id}: {e}")
        return jsonify({"error": "Maaf, terjadi kesalahan di sisi server saat memproses pesan Anda."}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)