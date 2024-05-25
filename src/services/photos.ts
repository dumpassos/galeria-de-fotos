import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
 

export const getAll = async () => { //pegar todas as fotos
    let list: Photo[] = [];

    const imageFolder = ref(storage, "images"); //referenciando a pasta 'images'
    const photoList = await listAll(imageFolder); //listando tudo que encontrar na pasta

    for(let i in photoList.items){
        const photoUrl = await getDownloadURL(photoList.items[i]); //gera o link para acessar a foto

        list.push({ //inserindo as fotos dentro do array
            name: photoList.items[i].name,
            url: photoUrl
        });
    }

    return list;
}

export const sendImage = async (file: File)=>{ //enviar imagem
    if(['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)){ //mimetypes permitidos

        let randomName = v4(); //gerando nome aleatorio para imagem

        let newFile = ref(storage, `images/${randomName}`); //criando o arquivo
        let upload = await uploadBytes(newFile, file); //mandando para upload

        let photoUrl = await getDownloadURL(upload.ref); //pegando url da imagem
        let name = upload.ref.name; //nome do arquivo/imagem
        
        return {
            name: name,
            url: photoUrl
        } as Photo

    } else {
        return new Error('Tipo de arquivo não permitido. Envie imagens .jpeg, .jpg ou .png')
    }
}