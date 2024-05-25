type Props = {
    url: string;
    name: string
}

export const PhotoItem = ({url, name}: Props)=>{
    return (
        <div className="bg-green-700 p-3 rounded-xl">
            <img src={url} alt={name} 
                className="max-w-full block mb-3 rounded-xl"
            />
            {name}
        </div>
    )
}