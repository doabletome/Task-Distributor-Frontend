import Layout from "../components/Layout";
import CsvUpload from "../components/CsvUpload";

// UploadPage wraps the CSV upload form inside the layout
export default function UploadPage() {
  return (
    <Layout>
      <CsvUpload />
    </Layout>
  );
}
