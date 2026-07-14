import { Button } from "@/components/ui/button";
function MagazineSummary({
  submissions,
  selected,
  onPublish,
}) {
  const chosen = submissions.filter((s) =>
    selected.includes(s._id)
  );

  const count = (category) =>
    chosen.filter(
      (s) => s.category === category
    ).length;

  return (
    <div className="sticky top-6 h-fit border rounded-2xl p-6 bg-white shadow-sm">

      <h2 className="text-2xl font-bold">

        Selection Summary

      </h2>

      <div className="space-y-4 mt-6">

        <div className="flex justify-between">

          <span>Articles</span>

          <span>{count("Articles")}</span>

        </div>

        <div className="flex justify-between">

          <span>Poems</span>

          <span>{count("Poems")}</span>

        </div>

        <div className="flex justify-between">

          <span>Short Stories</span>

          <span>{count("Short Stories")}</span>

        </div>

        <div className="flex justify-between">

          <span>Photography</span>

          <span>{count("Photography")}</span>

        </div>

        <div className="flex justify-between">

          <span>Paintings</span>

          <span>{count("Paintings")}</span>

        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">

          <span>Total</span>

          <span>{chosen.length}</span>

        </div>
        <Button
  className="w-full mt-8"
  disabled={selected.length === 0}
  onClick={onPublish}
>
  Publish Magazine
</Button>

      </div>

    </div>
  );
}

export default MagazineSummary;