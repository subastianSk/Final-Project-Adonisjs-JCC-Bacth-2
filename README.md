# Final-Project-Adonisjs-JCC-Bacth-1
Kelas : Nodejs Backend Dev With Adonis 

Batch : 2 

Nama : Dwi Yanto Subastian

Teknis Pengerjaan: Individu 

Deadline: Minggu, 3 April 2022 23.59 WIB 

# Restful API Main Bareng 
## Overview
Aplikasi Main Bareng untuk mempertemukan pemuda-pemuda yang ingin berolahraga tim (futsal/voli/basket/minisoccer/soccer) dan booking tempat bersama.

### Definisi: 
1. User

* Atribut tabel users: id, name, password, email, role
Data pengguna aplikasi. Terdapat 2 role: ‘user’, ‘owner’. 
* user : pengguna biasa yang dapat melakukan booking ke satu field. Dapat melakukan join/unjoin ke booking tertentu.
* owner: pemilik venue yang menyewakan lapangan (field) untuk dibooking.
2. Venue

Atribut tabel venues: id, name, address, phone

Data tempat sarana olahraga. Dapat berupa kompleks olahraga yang memiliki lebih dari satu lapangan (field) dan jenis olahraga. 

3. Field

Atribut tabel fields: id, name, type

Field adalah bagian dari Venue. Setiap field akan memiliki type yaitu jenis olahraga yang dimainkan di antaranya : soccer, minisoccer, futsal, basketball, volleyball 

4. Booking

Atribut tabel bookings: id, user_id, play_date_start, play_date_end, field_id

Booking adalah jadwal penyewaan atau jadwal main user di field/venue tertentu.


 
## Minimum Viable Product(MVP): 
* User dapat melakukan pemesanan booking baru (create), lalu update, read dan delete Booking tersebut.  
* Satu Booking bisa diikuti oleh banyak user. 
* User dapat join atau cancel join(unjoin) ke banyak Booking.
* Terdapat endpoint khusus admin tempat penyewaan venue olahraga (user ‘owner’) yang dapat membuat (create), melihat (read) dan mengubah (update) data venue. 
* Membuat dokumentasi API
* Deploy aplikasi API (heroku)

## Restful API
* Menggunakan Adonis v5
* Berikut endpoint api yang bisa jadi contoh: 
* Base-url : /api/v1

![image](https://user-images.githubusercontent.com/79132450/134944085-5a05acdb-32ba-400d-b874-58b8a2f2b2ee.png)
![image](https://user-images.githubusercontent.com/79132450/134944126-6a25d017-5730-4984-b9b1-172e3890a2d7.png)


## Contoh ERD
![image](https://user-images.githubusercontent.com/79132450/134943686-b698c68f-9f46-43bc-9f67-f93e281460bf.png)

## Link Dokumentasi API
link berikut https://project-adonisjs-jcc-bacth-2.herokuapp.com/

