
import { ChangeEvent, useEffect, useState } from 'react';
import './App.css'

function App() {
  const [description, setDescription] = useState<any>();
  const [img, setImg] = useState<any>();
  const [og, setOg] = useState<string>();


  let form = new FormData();
  let url = 'https://backog.onrender.com/genOG'

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

setOg(dResponse.url);

window && window.open(dResponse.url, '_blank').focus();

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

  {og && 
  <div>
 

      <img 
      width={1200}
      height={630}
      src= {og}

     />
    
    </div>}
    </>
  )
  
}

export default App
