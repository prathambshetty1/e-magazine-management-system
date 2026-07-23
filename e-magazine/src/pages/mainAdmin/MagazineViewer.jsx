import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { ROLES } from "@/config/roles";
import { getMagazineById } from "@/services/magazineService";

import { Button } from "@/components/ui/button";

import {
  FaArrowLeft,
  FaDownload,
} from "react-icons/fa";

import MagazineCover from "@/components/magazine/MagazineCover";
import TableOfContents from "@/components/magazine/TableOfContents";
import MagazineSection from "@/components/magazine/MagazineSection";

function MagazineViewer({ isPublic = false }) {
  const { id } = useParams();

  const navigate = useNavigate();

  const magazineRef = useRef(null);

  const [magazine, setMagazine] = useState(null);

  useEffect(() => {
    loadMagazine();
  }, []);

  const loadMagazine = async () => {
    try {
      const data = await getMagazineById(id);
      setMagazine(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: magazineRef,
    documentTitle: magazine?.title || "Magazine",
  });

  const content = !magazine ? (
    <div className="text-center py-20 text-lg">
      Loading magazine...
    </div>
  ) : (
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" />
          Back
        </Button>

        <Button onClick={handlePrint}>
          <FaDownload className="mr-2" />
          Download PDF
        </Button>

      </div>

      <div ref={magazineRef}>

        <MagazineCover magazine={magazine} />

        <TableOfContents
          grouped={{
            Articles: magazine.submissions.filter(
              (s) => s.category === "Articles"
            ),
            Poems: magazine.submissions.filter(
              (s) => s.category === "Poems"
            ),
            "Short Stories": magazine.submissions.filter(
              (s) => s.category === "Short Stories"
            ),
            Photography: magazine.submissions.filter(
              (s) => s.category === "Photography"
            ),
            Paintings: magazine.submissions.filter(
              (s) => s.category === "Paintings"
            ),
          }}
        />

        <div className="mt-12">

          {Object.entries({
            Articles: magazine.submissions.filter(
              (s) => s.category === "Articles"
            ),
            Poems: magazine.submissions.filter(
              (s) => s.category === "Poems"
            ),
            "Short Stories": magazine.submissions.filter(
              (s) => s.category === "Short Stories"
            ),
            Photography: magazine.submissions.filter(
              (s) => s.category === "Photography"
            ),
            Paintings: magazine.submissions.filter(
              (s) => s.category === "Paintings"
            ),
          }).map(([category, submissions]) => (
            <MagazineSection
              key={category}
              title={category}
              submissions={submissions}
            />
          ))}

        </div>

      </div>

    </div>
  );

  if (isPublic) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        {content}
      </div>
    );
  }

  return (
    <DashboardLayout role={ROLES.MAIN_ADMIN}>
      {content}
    </DashboardLayout>
  );
}

export default MagazineViewer;