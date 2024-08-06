
import { ChangeEvent, useEffect, useState } from 'react';
import './App.css'

function App() {
  const [description, setDescription] = useState<any>();
  const [img, setImg] = useState<any>();
  const [og, setOg] = useState<string>();


  let form = new FormData();
  let url = 'http://localhost:3000/genOG'

  async function handleSubmit() {

    form.append(
      'img', img
    )
    form.append(
      'desc', description
    )


 const response =  await fetch(url, {
      method: 'POST',
      body: form
    }
    )
    
  const dResponse = await response.json();

     const fLink = await fetch(dResponse.img, {
      method: 'POST'
     });
     const f2Link = await fLink.json();


    
    
     const imgURL = dResponse.img + '?alt=media&token=' + f2Link["downloadTokens"]
setOg(imgURL);

    }




  

  return (
    <>
    <div>
      <form id='uploadForm'>
        <h2>Upload a file</h2>

        <input
          type='file'
          onChange={(e: ChangeEvent) =>
            setImg(
              (e.target as HTMLInputElement)!.files![0]
            )
          }
        />

        <label>
          Description:
          <input
            id='desc'
            type='text'
            name='Descrition'
            placeholder='Description'
            onChange={(e) => {
              setDescription(e.currentTarget.value
              )
            }

            }
          /></label>
        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}

        >
          Submit
        </button>
      </form>
    </div>

  {og &&  <div>
      <img 
      key={`${og}${new Date().getTime()}`}
      src= {`${og}${new Date().getTime()}`}
    
     />

    </div>}
    </>
  )
  
}

export default App
