import { FormEvent, useEffect, useState } from 'react';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

function App() {
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(()=>{
      const getPhotos = async ()=>{
        setLoading(true); //carregando
        setPhotos(await Photos.getAll()); //pegando as fotos
        setLoading(false); //para de carregar pós pegar fotos
      }
      getPhotos(); //recomendação do React
    }, []);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault(); //impedindo de enviar

      const formData = new FormData(e.currentTarget);
      const file = formData.get('image') as File; //pegando o campo 'image'

      if(file && file.size > 0){ //se tem um arquivo e for maior que 0byte
        setUploading(true);
        let result = await Photos.sendImage(file); //enviando imagem
        setUploading(false);

        if(result instanceof Error){
          alert(`${result.name} - ${result.message}`)
        } else {
          let newPhotoList = [...photos]; //clonando a lista de fotos
          newPhotoList.push(result); //adicionando foto na lista
          setPhotos(newPhotoList); //setando a state com a lista nova
        }
      } 
    }

  return (
    <div className="bg-green-900 text-white min-h-screen"> {/* Container */}

      <div className="m-auto max-w-5xl py-8 px-0"> {/* Area Geral */}
        <h1 className="m-0 p-0 mb-8 text-center text-6xl font-semibold text-neutral-100">Galeria de Fotos</h1> {/* Header */}

        <form  method="post" onSubmit={handleFormSubmit}
        className='bg-green-700 rounded-xl p-4 mb-8'>
          <input type="file" name="image" id="" />
          <input className='rounded-xl  bg-gray-700 text-white
           py-2 px-4 my-0 mx-5 cursor-pointer text-base hover:opacity-85 ' type="submit" value="Enviar Imagem" />
           {uploading && "Enviando..."}
          </form>{/* Area de Upload */}

        {loading && 
          <div className='text-center'>
            <div className='text-7xl mb-5'>📸</div>
            <div className='text-2xl'>Carregando...</div>
          </div>
        } {/* Carregando fotos */}

        {!loading && photos.length > 0 &&
          <div className='grid grid-cols-4 gap-10'>
              {photos.map((item, index)=>(
                <PhotoItem key={index} url={item.url} name={item.name}/>
              ))}
          </div>
        } {/* Exibindo fotos (se houver) */}

        {!loading && photos.length === 0 &&
          <div className='text-center'>
          <div className='text-7xl mb-5'>❌</div>
          <div className='text-2xl'>Que pena, não achamos fotos na galeria...</div>
        </div>
        } {/* Quando não há fotos para exibir */}
        
        

      </div>

    </div>
  )
}

export default App;
