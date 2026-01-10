import { useState } from "react";
import {Layout} from "../../components/layout/Layout";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import JobForm from "../../components/hr/JobForm";

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateJob = async (jobData) => {
    setLoading(true);

    // 🔹 Fake API call (for now)
    console.log("New Job Data:", jobData);

    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false); // close modal after submit
    }, 800);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Create Job
        </Button>
      </div>

      {/* Jobs table will come later */}

      {/* Modal + Form LINKING */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Job"
      >
        <JobForm onSubmit={handleCreateJob} loading={loading} />
      </Modal>
    </Layout>
  );
};

export default Jobs;
