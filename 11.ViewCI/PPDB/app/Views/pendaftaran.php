<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Registration Form</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
    <style>
        body {
            font-family: 'Poppins';
        }

        h2 {
            text-align: left;
            color: #333;
            margin-bottom: 40px;
        }

        .form-icon {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
        }

        .form-icon img {
            width: 100%;
            height: auto;
            max-width: 100%;
        }

        form {
            max-width: 500px;
        }

        form label {
            display: block;
            margin-top: 10px;
            color: #666;
        }

        form input[type="text"],
        form input[type="date"],
        form input[type="submit"] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        .navbar {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="<?= base_url('assets/pngegg.png') ?>" alt="Logo" style="max-width: 100px; max-height: 100px;">
            PPDB Online ITS School
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pengumuman</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#">Mendaftar <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Contact</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <h2>Pendaftaran Tahun Ajaran 2024/2025</h2>
        <div class="row">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <div class="form-icon">
                    <img src="<?= base_url('assets/here.jpg') ?>" alt="Register Icon">
                </div>
            </div>
            <div class="col-md-8">
                <div class="form-fields">
                    <form action="submit_registration" method="post">
                        <div class="form-group">
                            <label for="nisn">NISN</label>
                            <input type="text" id="nisn" name="nisn" class="form-control" placeholder="NISN" required>
                        </div>

                        <div class="form-group">
                            <label for="full_name">Nama Lengkap</label>
                            <input type="text" id="full_name" name="full_name" class="form-control" placeholder="Nama Lengkap" required>
                        </div>
                           
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="birth_place">Tempat Lahir</label>
                                    <input type="text" id="birth_place" name="birth_place" class="form-control" placeholder="Tempat Lahir" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="birth_date">Tanggal Lahir</label>
                                    <input type="date" id="birth_date" name="birth_date" class="form-control" required>
                                </div>
                            </div>
                        </div>

                        <!-- Add additional fields here -->

                        <input type="submit" value="Submit" class="btn btn-primary">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End registration form -->

</body>
</html>