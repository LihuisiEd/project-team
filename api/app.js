const express = require('express');
const cors = require('cors');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const upload = multer();

app.use(cors({
    origin: '*',
}));

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'acceskey',
    secretAccessKey: 'secret access key',
});
const s3 = new AWS.S3();

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.file;

        if (!userId || !file) {
            return res.status(400).json({ error: 'Falta el ID de usuario o la imagen' });
        }

        const params = {
            Bucket: 'projectteamdbstoragetask205817-dev',
            Key: `users/${userId}/profile_photo`,
            Body: file.buffer,
        };
        await s3.upload(params).promise();

        res.status(200).json({ message: 'Imagen guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar la imagen en S3:', error);
        res.status(500).json({ error: 'Error al guardar la imagen' });
    }
});

app.get('/api/images/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const params = {
            Bucket: 'projectteamdbstoragetask205817-dev',
            Prefix: `users/${userId}/`,
        };

        const response = await s3.listObjectsV2(params).promise();
        const images = response.Contents.map((item) => {
            const imageUrl = s3.getSignedUrl('getObject', {
                Bucket: 'projectteamdbstoragetask205817-dev',
                Key: item.Key,
                Expires: 3600, // Expiración en segundos
            });
            return { key: item.Key, url: imageUrl };
        });

        res.status(200).json({ images });
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).json({ error: 'Error al obtener las imágenes' });
    }
});


app.get('/api/images/:userId/:imageName', async (req, res) => {
    try {
        const { userId, imageName } = req.params;
        const key = `users/${userId}/${imageName}`;

        const params = {
            Bucket: 'projectteamdbstoragetask205817-dev',
            Key: key,
        };

        const data = await s3.getObject(params).promise();

        const contentType = data.ContentType;
        res.setHeader('Content-Type', contentType);
        res.set('Content-Type', 'image/jpeg');
        res.send(data.Body);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error al obtener la imagen' });
    }
});

app.listen(3000, () => {
    console.log('Servidor API iniciado en el puerto 3000');
});
