import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ArticleSelector from "@/components/article/ArticleSelector";
import ArticleForm from "@/components/article/SubmissionForm";

import { ROLES } from "@/config/roles";

function SubmitArticle() {
  const [category, setCategory] = useState("");

  return (
    <DashboardLayout role={ROLES.STUDENT}>
      <div className="max-w-6xl mx-auto">

        {!category ? (
          <ArticleSelector
            onSelect={setCategory}
          />
        ) : (
          <ArticleForm
            category={category}
            onBack={() => setCategory("")}
          />
        )}

      </div>
    </DashboardLayout>
  );
}

export default SubmitArticle;