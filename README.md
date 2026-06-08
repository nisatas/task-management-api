#  Task Management API

JWT authentication destekli bir **Task Management API** projesidir. Bu proje kapsamında kullanıcılar sisteme kayıt olabilir, giriş yapabilir ve yalnızca kendi görevleri üzerinde CRUD işlemleri gerçekleştirebilir.

<!-- BADGES -->
<p align="center">
  <img src="https://shields.io" alt="NodeJS" />
  <img src="https://shields.io" alt="ExpressJS" />
  <img src="https://shields.io" alt="Prisma" />
  <img src="https://shields.io" alt="SQLite" />
  <img src="https://shields.io" alt="JWT" />
  <img src="https://shields.io" alt="Swagger" />
</p>

---

##  Proje Özeti

Bu API, kullanıcı bazlı görev yönetimi yapmak için geliştirilmiştir.

* Kullanıcı sisteme giriş yaptıktan sonra JWT token alır.
* Bu token ile korumalı task endpointlerine erişebilir.
* Her kullanıcı yalnızca kendi oluşturduğu görevleri görüntüleyebilir, güncelleyebilir ve silebilir.

---

##  Özellikler

*  Kullanıcı kayıt ve giriş sistemi
*  JWT token üretimi ve token kontrollü korumalı endpointler
*  Kullanıcıya özel task CRUD işlemleri
*  **Prisma ORM** ile veritabanı yönetimi ve **SQLite** kullanımı
*  **Swagger API** dokümantasyonu
*  `bcryptjs` ile güvenli şifre saklama
*  `.env.example` ile kolay environment yapılandırması

---

##  Kullanılan Teknolojiler

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database & ORM:** SQLite, Prisma ORM
* **Güvenlik:** JWT (jsonwebtoken), bcryptjs, cors, dotenv
* **Dokümantasyon & Tooling:** Swagger, Nodemon

---

##  API Endpointleri

### Auth Endpointleri


| Metot | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Yeni kullanıcı kaydı oluşturur. |
| `POST` | `/auth/login` | Kullanıcı girişi yapar ve JWT token döner. |

### Task Endpointleri


| Metot | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/task` | Yeni görev oluşturur. ✨ |
| `GET` | `/tasks` | Giriş yapan kullanıcının tüm görevlerini listeler. |
| `GET` | `/tasks/:id` | Belirli bir görevin detayını getirir. |
| `PUT` | `/tasks/:id` | Belirli bir görevi günceller. |
| `DELETE` | `/tasks/:id` | Belirli bir görevi siler. |

> **Önemli:** Task endpointleri JWT token ile korunmaktadır. Bu endpointlere istek atarken `Authorization` header içinde Bearer token gönderilmelidir:
> ```http
> Authorization: Bearer YOUR_TOKEN
> ```

---

##  Swagger Dokümantasyonu

Proje çalıştırıldıktan sonra Swagger API dokümantasyonuna aşağıdaki adresten ulaşılabilir:

```bash
http://localhost:3000/api-docs
```

* Swagger üzerinden auth ve task endpointleri test edilebilir.
* Task endpointlerini test etmek için önce `/auth/login` endpointinden token alınmalı, ardından Swagger arayüzündeki **Authorize** alanına bu token eklenmelidir.

---

##  Kurulum ve Çalıştırma

1. **Projeyi bilgisayarınıza klonlayın:**
   ```bash
   git clone https://github.com/nisatas/task-management-api.git
   cd task-management-api
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Çevre değişkenlerini ayarlayın:**
   `.env.example` dosyasını kopyalayarak bir `.env` dosyası oluşturun:
   ```bash
   cp .env.example .env
   ```
   Dosya içeriğinin aşağıdaki gibi olduğundan emin olun:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

4. **Veritabanı migration ve client işlemlerini çalıştırın:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Projeyi lokalde başlatın:**
   ```bash
   npm run dev
   ```
   Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

## Örnek Kullanım (cURL)

### 1. Register (Kayıt Olma)
```bash
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Nisa","email":"test@mail.com","password":"123456"}'
```
<details>
<summary>Başarılı Response Örneği</summary>

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Nisa",
    "email": "test@mail.com"
  }
}
```
</details>

### 2. Login (Giriş Yapma)
```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@mail.com","password":"123456"}'
```
<details>
<summary>Başarılı Response Örneği</summary>

```json
{
  "message": "Login successful",
  "token": "YOUR_JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Nisa",
    "email": "test@mail.com"
  }
}
```
*Geri kalan task endpoint işlemlerinde bu `token` değeri kullanılmalıdır.*
</details>

### 3. Task Oluşturma
```bash
curl -X POST http://localhost:3000/task \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{"title":"Case projesini tamamla","description":"JWT auth ve CRUD endpointlerini bitir"}'
```

### 4. Diğer Task İstekleri
```bash
# Tüm Görevleri Listeleme
curl http://localhost:3000/tasks -H "Authorization: Bearer YOUR_TOKEN"

# ID'ye Göre Detay Getirme
curl http://localhost:3000/tasks/1 -H "Authorization: Bearer YOUR_TOKEN"

# Görev Güncelleme
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_TOKEN" \
-d '{"title":"Task güncellendi","description":"PUT endpointi test edildi","completed":true}'

# Görev Silme
curl -X DELETE http://localhost:3000/tasks/1 -H "Authorization: Bearer YOUR_TOKEN"
```

---

##  Proje Yapısı

```text
task-management-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── swagger.js
├── .env.example
├── package.json
└── README.md
```

---

##  Veritabanı Modelleri

Projede iki temel model bulunmaktadır ve aralarında **One-to-Many (Bire Çok)** ilişki vardır:
* **User**: Sistemdeki kullanıcı bilgilerini tutar.
* **Task**: Kullanıcılara atanan görevleri tutar.

> ℹ **İlişki Tipi:** Her task tek bir kullanıcıya bağlıdır. Cascade silme kuralı aktiftir; yani bir kullanıcı silindiğinde, ona ait tüm tasklar otomatik olarak temizlenir.

---

##  Güvenlik Önlemleri

*  Kullanıcı şifreleri veritabanına asla düz metin (plain-text) olarak kaydedilmez, `bcryptjs` ile hashlenir.
*  Tüm task operasyonları sıkı bir şekilde JWT doğrulamasına tabidir.
*  Kullanıcı izolasyonu mevcuttur; hiç kimse bir başkasının görevinin ID'sini bilse dahi erişemez veya değiştiremez.
*  Hassas verilerin sızmasını önlemek adına `.env` dosyası git geçmişine dahil edilmez, sadece şablonu paylaşılır.

---

##  Geliştirici

**Nisa Ataş**
* GitHub: [@nisatas](https://github.com/nisatas)
* LinkedIn: [@nisaatas](https://www.linkedin.com/in/nisaatas/)
