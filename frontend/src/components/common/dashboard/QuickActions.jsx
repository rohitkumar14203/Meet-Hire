import { Button } from "../Button"

export const QuickActions = () => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-sm p-5 border">
                <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>

                <div className="flex flex-col gap-3">
                    <Button variant="primary">➕ Create Job</Button>
                    <Button variant="secondary">👤 Add Candidate</Button>
                    <Button variant="secondary">📅 Schedule Interview</Button>
                </div>
            </div>
        </>
    )
}