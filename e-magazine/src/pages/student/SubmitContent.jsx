import { useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ArticleSelector from "@/components/article/ArticleSelector";
import ArticleForm from "@/components/article/SubmissionForm";

import { ROLES } from "@/config/roles";

function SubmitArticle() {
  const { id } = useParams();

  const [category, setCategory] = useState("");

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="max-w-6xl mx-auto">

        {!id && !category ? (
          <ArticleSelector
            onSelect={setCategory}
          />
        ) : (
          <ArticleForm
            submissionId={id}
            category={category}
            onCategoryChange={setCategory}
            onBack={() => setCategory("")}
          />
        )}

      </div>
    </DashboardLayout>
  );
}

export default SubmitArticle;