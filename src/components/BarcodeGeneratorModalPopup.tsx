import { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ModalPopup from "./themes/ModalPopup";
import { Button } from "@heroui/button";

function Main({ barcode_string }: any) {

  const [loading_imgBtn, set_loading_imgBtn] = useState(false);
  const [loading_pdfBtn, set_loading_pdfBtn] = useState(false);

  const svgRef = useRef(null);
  const containerRef: any = useRef(null);
  const [value, setValue] = useState('45-3-22');

  // Generate barcode whenever value changes
  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 16,
        margin: 10,
      });
    }

  }, [value]);

  useEffect(() => {
    setValue(barcode_string)
  }, [])
  // Download as PNG image
  const downloadImage = async () => {
    set_loading_imgBtn(true)
    const canvas = await html2canvas(containerRef.current, {
      scale: 3,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `${value}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    set_loading_imgBtn(false)
  };

  // Download as PDF
  const downloadPDF = async () => {
    set_loading_pdfBtn(true);
    const canvas = await html2canvas(containerRef.current, {
      scale: 4,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5",
    });

    const imgWidth = 150;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 30, 50, imgWidth, imgHeight);
    pdf.save(`${value}.pdf`);
    set_loading_pdfBtn(false);
  };

  return (
 
      <div style={{ padding: "40px", textAlign: "center" }}>

        <input
          value={barcode_string}
          onChange={(e) => setValue(e.target.value)}

          style={{ padding: "8px", marginBottom: "20px" ,outline:'none'}}
        />

        <div
          ref={containerRef}
          style={{
            background: "#fff",
            padding: "20px",
            display: "inline-block",
          }}
        >
          <svg ref={svgRef}></svg>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button isLoading={loading_imgBtn} onPress={downloadImage} style={{ marginRight: "10px" }}>
            Download PNG
          </Button>

          <Button isLoading={loading_pdfBtn} onPress={downloadPDF}>
            Download PDF
          </Button>
        </div>
      </div>


  );
}


function BarcodeGeneratorModalPopup({ range,distributed_list }: any) {
return    <ModalPopup btn_size='md' size='2xl' button_title='Barcode' >
  <div className="flex gap-2">
{distributed_list.list.map((e:any)=>{
   return <>
   <Main barcode_string={`${range}-${e.key}-${4}`}/>
   </>
})}




  </div>
  </ModalPopup>
}


export default BarcodeGeneratorModalPopup;
