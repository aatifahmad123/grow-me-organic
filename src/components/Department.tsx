import { useState } from "react";
import { Checkbox } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './Department.css'


const data = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const Department: React.FC = () => {

    const [expanded,setExpanded] = useState<{[key: string]: boolean}>({})
    const [depselected,setdepselected] = useState<{[key: string]: boolean}>({})
    const [subdepselected,setsubdepselected] = useState<{[key: string]: boolean}>({})

    const toggleExapnd = (department: string) =>{
        setExpanded((prevexpanded)=>({
            ...prevexpanded,
            [department]: !prevexpanded[department]
        }))
    }

    const handleDepCheckboxChange = (dep: string, subdeps: string[]) => {
        if(depselected[dep]){
            // the department and subdepartments have to be set false
            setdepselected(prevDepSelected => ({
                ...prevDepSelected,
                [dep]: false
            }));
            subdeps.forEach((s)=>{
                setsubdepselected(prevsubdepSelected => ({
                    ...prevsubdepSelected,
                    [s]: false
                }));
            })
        }
        else{
            // the department and subdepartments have to be set true
            setdepselected(prevDepSelected => ({
                ...prevDepSelected,
                [dep]: true
            }));
            subdeps.forEach((s)=>{
                setsubdepselected(prevsubdepSelected => ({
                    ...prevsubdepSelected,
                    [s]: true
                }));
            })
        }

        
    };

    const handlesubDepCheckboxChange = (subdep: string,dep: string) => {
        if(subdepselected[subdep]){
            // subdep has to be set false and dep has to be set false
            setsubdepselected(prevsubdepSelected => ({
                ...prevsubdepSelected,
                [subdep]: false
            }));

            setdepselected(prevDepSelected => ({
                ...prevDepSelected,
                [dep]: false
            }));
        }

        else{
            // subdep has to be set true
            setsubdepselected(prevsubdepSelected => ({
                ...prevsubdepSelected,
                [subdep]: true
            }));

            // if all subdeps are not true, then the dep also has to be true
            let count = 0;
            const depobj = data.find(it => it.department === dep);
            if(depobj){
                const subdeparr = depobj.sub_departments;
                subdeparr.forEach(element => {
                    if(subdepselected[element]){
                        count++;
                    }
                });

                if(count == depobj.sub_departments.length - 1){
                    setdepselected(prevDepSelected => ({
                        ...prevDepSelected,
                        [dep]: true
                    }));
                }
            }
            
        }
        
    };
    
  return (
    <>
    <div className="component-two">
        <div>
        {data.map((dep,idx)=>{
            return (<div key={idx}>
                {expanded[dep.department] ? (
                    <ExpandLessIcon onClick={()=>toggleExapnd(dep.department)}></ExpandLessIcon>
                ) : (
                    <ExpandMoreIcon onClick={()=>toggleExapnd(dep.department)}></ExpandMoreIcon>
                )
            }
                <Checkbox
                        checked={depselected[dep.department] || false}
                        onChange={() => handleDepCheckboxChange(dep.department,dep.sub_departments)}
                    />
                {dep.department} ({dep.sub_departments.length})
                {expanded[dep.department] && (
                    <div className="sub-dep">
                        {dep.sub_departments.map((subdep,subidx)=>{
                            return(
                                <div key={subidx}><Checkbox
                                checked={subdepselected[subdep] || false}
                                onChange={() => handlesubDepCheckboxChange(subdep,dep.department)}
                            />{subdep}</div>
                            )
                        })}
                    </div>
                    
                )}
            </div>)
        })}
        </div>
        </div>
    </>
  );
};

export default Department;
