"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const uploadedDocuments = [
  {
    id: "1",
    title: "Política de Privacidade v2.0",
    uploadDate: "2024-01-15",
    size: "2.3 MB",
    status: "active",
    contributions: 23,
  },
  {
    id: "2",
    title: "Termos de Uso Atualizados",
    uploadDate: "2024-01-12",
    size: "1.8 MB",
    status: "review",
    contributions: 18,
  },
  {
    id: "3",
    title: "Manual do Utilizador v3.1",
    uploadDate: "2024-01-10",
    size: "4.1 MB",
    status: "active",
    contributions: 31,
  },
];

export default function AdminPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simular upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Administração</h2>
        <p className="text-muted-foreground">
          Faça upload de documentos PDF para análise colaborativa
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload de Documento</CardTitle>
            <CardDescription>
              Envie um arquivo PDF para receber contribuições dos utilizadors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Documento</Label>
                <Input
                  id="title"
                  placeholder="Ex: Política de Privacidade v2.0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o documento e o tipo de contribuições esperadas..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Arquivo PDF</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      required
                    />
                    <Label
                      htmlFor="file"
                      className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Selecionar PDF
                    </Label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Máximo 10MB - Apenas arquivos PDF
                  </p>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : uploadSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Enviado com Sucesso!
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Enviar Documento
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Document List */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Enviados</CardTitle>
            <CardDescription>
              Lista de documentos disponíveis para contribuições
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                      <span>•</span>
                      <span>{doc.contributions} contribuições</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={doc.status === "active" ? "default" : "secondary"}
                  >
                    {doc.status === "active" ? "Ativo" : "Revisão"}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Gerenciar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
