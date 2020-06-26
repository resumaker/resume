import kebabCase from 'lodash.kebabcase';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const html2canvas = typeof window !== `undefined` ? require('html2canvas') : null;
const jsPDF = typeof window !== `undefined` ? require('jspdf') : null;

const exportPNG = (canvas, name) => {
  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${kebabCase(name)}-resume.png`;
  link.href = imgData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  trackCustomEvent({
    category: 'Export PNG',
    action: 'Click',
    label: 'Export',
  });
};

const exportPDF = (canvas, name) => {
  const imgData = canvas.toDataURL('image/png', 1.0);
  const doc = (() => {
    if (canvas.width > canvas.height) {
      return new jsPDF('l', 'mm', [canvas.width, canvas.height]);
    }
    return new jsPDF('p', 'mm', [canvas.height, canvas.width]);
  })();

  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();

  doc.addImage(imgData, 'PNG', 0, 0, docWidth, docHeight);
  doc.save(`${kebabCase(name)}-resume.pdf`);

  trackCustomEvent({
    category: 'Export PDF',
    action: 'Click',
    label: 'Export',
  });
};

const exportDoc = (htmlBody, name) => {
  const htmlHead = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  const htmlEnd = '</body></html>';
  const html = htmlHead + htmlBody + htmlEnd;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);  
  const filename = `${kebabCase(name)}-resume.doc`;
  
  if (navigator.msSaveOrOpenBlob ){
      navigator.msSaveOrOpenBlob(blob, filename);
  } else {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
      document.body.removeChild(downloadLink);
  }

  trackCustomEvent({
    category: 'Export DOCS',
    action: 'Click',
    label: 'Export',
  });
}

const exportResume = async (docType, fullname, isMobile) => {
    const resumeEl = document.getElementById('resume');

    const y = resumeEl.offsetTop ? resumeEl.offsetTop : (isMobile ? 230 : 180);

    const width = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).width) : 0;
    const height = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).height) : 0;

    const canvas = await html2canvas(resumeEl, { y, width, height });

    if (docType === 'pdf') {
        exportPDF(canvas, fullname);
    } else if (docType === 'png') {
        exportPNG(canvas, fullname);
    } else if (docType === 'docx') {
        exportDoc(resumeEl.innerHTML, fullname);
    }
};

export default exportResume;