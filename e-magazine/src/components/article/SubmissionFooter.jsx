import { Button } from "@/components/ui/button";
function SubmissionFooter({
  loading,
  submitText,
  onSubmit,
  showDraftButton = true,
}) {
  return (
    <div className="flex justify-end gap-4 pt-8">

      {showDraftButton && (
        <Button variant="outline">
          Save Draft
        </Button>
      )}

      <Button
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : submitText}
      </Button>

    </div>
  );
}

export default SubmissionFooter;