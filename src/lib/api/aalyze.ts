


interface GeneratePhotoRequest {
  // Define the structure of the request payload for generating a professional photo
  imageUrl: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

interface GeneratePhotoResponse{
    success: boolean;
    message: string;
    data: {
        originalImage: string;
        generatedImage?: string;
        fileName?: string;
        fileSize?: number;
        fileType?: string;
        [key: string]: any; // CAMPOS ADICIONAIS

    },
    error?: String
}

export async function generateProfessionalPhoto(request: GeneratePhotoRequest) {

    console.log("executando mutation generate photo")

  const response = await fetch("/api/analyze", {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(request)
  })

    if(!response.ok){
      const error = await response.json();
      throw new Error(error.error || " FALHA AO GERAR FOTO PROFISSIONAL")
    }


  return response.json();  
}