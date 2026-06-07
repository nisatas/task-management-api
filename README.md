# Task Management API

JWT authentication destekli basit bir **Task Management API** projesidir.  
Bu proje, backend developer intern case çalışması kapsamında geliştirilmiştir.

---

## 🎯 Proje Amacı

Bu API ile kullanıcıların sisteme kayıt olması, giriş yapması ve kendi görevleri üzerinde CRUD işlemleri yapması hedeflenmektedir.

### 📌 Temel Görev (Task) Endpointleri
Case kapsamında geliştirilmesi beklenen temel endpointler:

| Metot | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `POST` | `/task` | Yeni bir görev oluşturur. |
| `GET` | `/tasks` | Tüm görevleri listeler. |
| `GET` | `/tasks/:id` | Belirli bir görevin detayını getirir. |
| `PUT` | `/tasks/:id` | Belirli bir görevi günceller. |
| `DELETE` | `/tasks/:id` | Belirli bir görevi siler. |

### 🔐 Kimlik Doğrulama (Auth) Endpointleri
JWT authentication yapısı için ayrıca kullanıcı kayıt ve giriş endpointleri eklenecektir:

* `POST /auth/register`
* `POST /auth/login`

> **Not:** Bu endpointler, kullanıcıların kimlik doğrulaması yapabilmesi ve task işlemlerinin güvenli şekilde gerçekleştirilebilmesi için gereklidir.

---

## 🛠️ Kullanılan Teknolojiler

* **Node.js**
* **Express.js**
* **JWT** (JSON Web Token)
* **bcryptjs**
* **dotenv**
* **cors**
* **nodemon**

---

## 🚀 Kurulum ve Çalıştırma

Projeyi bilgisayarınıza indirdikten sonra bağımlılıkları kurmak için terminalde aşağıdaki komutu çalıştırın:

```bash
npm install