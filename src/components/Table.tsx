import axios from "axios"
import {DataGrid, GridColDef} from '@mui/x-data-grid'
import { useEffect, useState } from "react";
import './Table.css'

interface Data{
    userId: number;
    id: number;
    title: string;
    body: string;
}

const Table: React.FC = () => {
    const [posts,setPosts] = useState<Data[]>([]);

    useEffect(()=>{
        const getData = async () =>{
            try{
                const response = await axios.get<Data[]>('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data)
            }
            catch(error){
                console.log('An error occurred : ',error);
            }
        }

        getData();
    },[])

    const cols: GridColDef[] = [
        { field: 'id', headerName: 'ID',width: 100},
        { field: 'title', headerName: 'Title', width: 500},
        { field: 'body', headerName: 'Body', width:600},
    ];

  return (
    <div className="component-one">
        <DataGrid
        rows={posts}
        columns={cols}
        ></DataGrid>
    </div>
  )
}
export default Table