import List from "@/components/List";
import axios from "axios";

export default async function Users() {

    const res = await axios.get("/api/users/");
    console.log("data", res.data)


    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-md"> Users List</h1>
            <List />
        </div>
    )
}
