# 🚀 **PROJECT BRIEF – Life Journey Tracker Web App**

## 📌 **1. Ringkasan Aplikasi**

**Life Journey Tracker** adalah aplikasi web yang membantu user memetakan perjalanan hidup mereka dengan cara mencatat:

* **Tujuan** (goals / harapan)
* **Perjalanan** (langkah-langkah menuju tujuan itu)
* **Rintangan** (halangan yang muncul di tiap langkah)
* **Emosi** (reaksi emosional terhadap rintangan)

Aplikasi ini berfungsi sebagai media *self-reflection* dan *personal growth tracking*, sesuai dengan struktur ERD yang telah dibuat dari makna lirik “Surga Hati”.

User bisa melihat progres, pola rintangan yang sering muncul, serta emosi dominan yang memengaruhi perkembangan mereka.

---

# 🧠 **2. Use Case Utama**

1. User membuat akun → jadi Tokoh_Utama
2. User membuat satu atau beberapa Tujuan hidup
3. Tiap Tujuan punya Perjalanan (steps)
4. Tiap Perjalanan punya Rintangan
5. Tiap Rintangan punya Emosi
6. User melihat insight dari perkembangan hidupnya

---

# 🎯 **3. Fitur MVP (Minimum Viable Product)**

### **① Authentication (Basic)**

* Register
* Login
* Logout

### **② CRUD Tokoh_Utama (Profile)**

* Update tekad
* Keimanan
* Kondisi jiwa

### **③ CRUD Tujuan**

* Create tujuan baru
* Edit tujuan
* Hapus tujuan
* List semua tujuan milik user

### **④ CRUD Perjalanan**

* Tambah langkah perjalanan ke tujuan tertentu
* Edit arah perjalanan & ketahanan
* Hapus perjalanan
* List perjalanan per tujuan

### **⑤ CRUD Rintangan**

* Tambah rintangan pada perjalanan
* Edit jenis rintangan
* Hapus rintangan
* List rintangan per perjalanan

### **⑥ CRUD Emosi**

* Tambah emosi ke rintangan
* Edit jenis emosi
* Hapus emosi
* List emosi per rintangan

### **⑦ Dashboard Insight**

* Statistik emosi paling sering
* Rintangan yang dominan
* Progress tiap tujuan
* Timeline perjalanan user

---

# 🔄 **4. Alur Aplikasi**

### **1️⃣ User membuka app → login/register**

### **2️⃣ User mengisi profil Tokoh Utama (opsional)**

→ Tekad, keimanan, kondisi_jiwa.

### **3️⃣ User membuat Tujuan hidup**

Contoh:

* “Menjadi pribadi lebih tenang”
* “Meningkatkan disiplin diri”

### **4️⃣ User membuat Perjalanan untuk mencapai tujuan tersebut**

Contoh:

* “Meditasi pagi 10 menit”
* “Kurangi begadang”

### **5️⃣ User mencatat Rintangan tiap langkah**

* malas
* overthinking
* kurang konsisten

### **6️⃣ User mencatat Emosi yang dirasakan**

* cemas
* semangat
* pasrah
* sedih
* bersyukur

### **7️⃣ User lihat dashboard insight**

---

# 🗂️ **5. Database Schema**

### **TOKOH_UTAMA**

* id_tokoh (PK)
* tekad
* keimanan
* kondisi_jiwa

### **TUJUAN**

* id_tujuan (PK)
* id_tokoh (FK)
* jenis_tujuan
* hasil

### **PERJALANAN**

* id_perjalanan (PK)
* id_tokoh (FK)
* ketahanan
* arah

### **RINTANGAN**

* id_rintangan (PK)
* id_perjalanan (FK)
* jenis_rintangan

### **EMOSI**

* id_emosi (PK)
* id_rintangan (FK)
* jenis_emosi

---

# 🧰 **6. Tech Stack (Lengkap & Cocok untuk Web App Production)**

## **Backend**

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **Prisma ORM**
* **Zod** (validasi input)
* **JWT Auth** (access & refresh token)
* **bcrypt** (hashing password)
* **dotenv**
* **Cors**
* **Helmet** (security)
* **Nodemon** (dev)

## **Frontend**

* **React**
* **Vite**
* **TailwindCSS**
* **React Router**
* **TanStack Query (React Query)** (fetching data powerful)
* **Axios**
* **Zustand** atau **Context API** (state management)

## **Dev Tools**

* **ESLint + Prettier**
* **Git + GitHub**
* **Gemini CLI** untuk scaffolding & coding assist

---

# 📡 **7. API Endpoint Structure**

### **Auth**

```
POST /auth/register
POST /auth/login
POST /auth/logout
```

### **Tokoh**

```
GET /tokoh/me
PUT /tokoh/me
```

### **Tujuan**

```
GET /tujuan
POST /tujuan
PUT /tujuan/:id
DELETE /tujuan/:id
```

### **Perjalanan**

```
GET /tujuan/:id/perjalanan
POST /tujuan/:id/perjalanan
PUT /perjalanan/:id
DELETE /perjalanan/:id
```

### **Rintangan**

```
GET /perjalanan/:id/rintangan
POST /perjalanan/:id/rintangan
PUT /rintangan/:id
DELETE /rintangan/:id
```

### **Emosi**

```
GET /rintangan/:id/emosi
POST /rintangan/:id/emosi
PUT /emosi/:id
DELETE /emosi/:id
```

### **Dashboard Insight**

```
GET /dashboard/stats
```

---

# 🎨 **8. Frontend Struktur Page**

```
/src
  /components
  /pages
    - Login.jsx
    - Register.jsx
    - Dashboard.jsx
    - TokohProfile.jsx
    - TujuanList.jsx
    - TujuanDetail.jsx
    - PerjalananDetail.jsx
    - RintanganDetail.jsx
  /hooks
  /api
  /store
  /layouts
```

---

# 🧩 **9. Flowchart Sederhana**

```
User -> Login/Register
      -> Isi/Update Profil Tokoh
      -> Buat Tujuan
         -> Buat Perjalanan
            -> Input Rintangan
               -> Input Emosi
                  -> Dashboard -> Insight
```

---
