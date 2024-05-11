"use client";
 
import { UploadButton } from "@/lib/uploadthing"
import type { ElementsType, FormElement } from "../FormElements";
import { MdFileUpload } from "react-icons/md";
import { UploadPdfForm } from "@/actions/form";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";


const type: ElementsType = "UploadButtonField"



export const UploadButtonFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type: "UploadButtonField",
    extraAttributes: {},
  }),
  designerBtnElement: {
    icon: MdFileUpload,
    label: "Upload field"
  },
  designerComponent: () => {
    return <div>Upload Field</div>;
  },
  formComponent: UploadFieldComponent,
  propertiesComponent: ({ elementInstance }) => {
    return <div>Upload Pdf</div>;
  },
  validate: () => true
}

function UploadFieldComponent() {
  const pathname = usePathname()
  return <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={async(res) => {
          await UploadPdfForm(pathname.split("/")[2], JSON.stringify(!!res && res.map((r) => r.url)))
       toast({title: "Upload complete"})
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
}