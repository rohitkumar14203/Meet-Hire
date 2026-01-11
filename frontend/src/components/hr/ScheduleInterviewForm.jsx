import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Dropdown } from "../ui/Dropdown";

export const ScheduleInterviewForm = ({ candidate, onClose }) => {
  const [dateTime, setDateTime] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      candidateId: candidate.id,
      dateTime,
      interviewer,
      meetingLink,
    };

    console.log("Interview Scheduled:", payload);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date & Time"
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />

      <Dropdown
        label="Interviewer"
        value={interviewer}
        onChange={(e) => setInterviewer(e.target.value)}
        options={[
          { label: "John Doe (Senior Engineer)", value: "john" },
          { label: "Jane Smith (Tech Lead)", value: "jane" },
        ]}
        required
      />

      <Input
        label="Meeting Link"
        placeholder="https://meet.google.com/abc"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
        required
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Confirm Schedule
        </Button>
      </div>
    </form>
  );
};
