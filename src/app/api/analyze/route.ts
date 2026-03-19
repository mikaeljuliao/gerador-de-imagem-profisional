import { FileType } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "stream/consumers";
import z, { success } from "zod";
import { finalize } from "zod/v4/core";

const analyRequestSchema = z.object({
    imageUrl: z.string().min(1, "Imagem url ´r obrigatoria"),
    fileName: z.string().optional(),
    finalize: z.number().optional(),
    FileType: z.string().optional()


})

export async function POST(request: NextRequest){
    try{

    const body = await request.json();
    const validation = analyRequestSchema.safeParse(body);

    if(!validation.success){
         return NextResponse.json(
            {
                sucess: false,
                error: "Error ao analisar e  gerar foto",
            },
        {status: 400,},
    )
    }

    const { imageUrl, fileName, finalize, FileType } = validation.data

    const base64Data = imageUrl.split(",")[1]
    const mimeType = imageUrl.match(/data:([^;]+);/)?.[1] || "image/jpeg"
    const buffer = Buffer.from(base64Data, "base64")
     const blob = new Blob([buffer], {type: mimeType})


     const formData = new FormData()
     formData.append("data", blob, fileName)


     const n8n8WebhookUrl = "http://localhost:5678/webhook-test/06c4db0b-3e9d-4daa-8bff-cceb90711b9e"
     const n8nResponse = await fetch(n8n8WebhookUrl, {
         method: "POST",
         body: formData
     })

     if(!n8nResponse.ok){
         return NextResponse.json(
            {
                sucess: false,
                error: "Error ao analisar e  gerar foto",
            },
        {status: 400,},
    )
    }

    const response = await n8nResponse.json()

    return NextResponse.json({
        success:true,
        message: "Foto profisioal gerada com sucesso!",
        data: {
            originalImage: "",
            generateImage: "",
            fileName, 
            finalize, 
            FileType
        }
    })
         
    } catch (error) {
        console.log(error);
        console.log("FALHA API/ANALYZ", error)
        return NextResponse.json(
            {
                sucess: false,
                error: "Error ao analisar e gerar foto",
            },
            { status: 500 },
        )
    }
}