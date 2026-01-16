import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "../store/slice/applications/applications.slice";

export const useApplications = () => {

    const { applicationsList, loading, error } = useSelector((state) => state.applications);
    

    const dispatch = useDispatch();

    const loadApplications = (jobId) => {
        return dispatch(getApplications(jobId));
    };


    return {
        applications: applicationsList,
        loading,
        error,
        loadApplications,
    };
}