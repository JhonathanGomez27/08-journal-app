import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dtxbtibd2',
    api_key: '728153486244985',
    api_secret: '650lC7rVOjiWm6iZnlblMi2KvbA',
    secure: true
})

describe('Prueba en fileUpload', () => {

    test('Debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://static.vecteezy.com/system/resources/previews/000/246/312/non_2x/mountain-lake-sunset-landscape-first-person-view-vector.jpg';

        const resp = await fetch( imageUrl );

        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imgeId = segments[segments.length -1 ].replace('.jpg','');

        await cloudinary.api.delete_resources(['journal/' + imgeId]);
    });

    test('Debe de retornar null', async() => {
        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });

});