
import { ChangeEvent, useState } from 'react';
import './App.css'


function App() {
  const [content, setContent] = useState<any>();
  const [img, setImg] = useState<any>();
  const [og, setOg] = useState<string>();
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<any>();

  let form = new FormData();
  let url = 'https://backendoggen.onrender.com/genOG'

  async function handleSubmit() {

    if(!title || !content){
      alert('Title or Content should not be empty..');
      return;
    }

    setLoading(true);

    form.append(
      'title', title
    )

    form.append(
      'img', img
    )

    form.append(
      'content', content
    )

    const response = await fetch(url, {
      method: 'POST',
      body: form
    }
    )

    const dResponse = await response.json();

    setOg(dResponse.url);
    setLoading(false)
  }


  return (
    <>
      <div className='container'>
        <div className='form'>
          <form id='uploadForm'>
            <h2>OG Generator</h2>
            <a href="https://github.com/yakshao/OGBackend/"><i className={"fa fa-github"} style={{fontSize:'30px', color: 'black'}}></i></a>
            <div style={{alignSelf: 'center' }}>

              <h5
                style={{ margin: 10 }}
              >Title</h5>


              <input
                style={{ width: '400px', padding: '20px', borderRadius: '10px' }}
                id='desc'
                name='Descrition'
                type='text'
                placeholder='Title'
                onChange={(e) => {
                  setTitle(e.currentTarget.value
                  )
                }
                }
              />

            </div>

            <div style={{  margin: '20px', alignSelf: 'center' }}>

              <h5
                style={{ margin: 10 }}
              >Content</h5>

              <textarea
                style={{ width: '400px', height: '100px', padding: '20px', borderRadius: '10px' }}
                id='desc'
                name='Descrition'
                placeholder='Content'
                onChange={(e) => {
                  setContent(e.currentTarget.value
                  )
                }
                }
              />

            </div>

            <h5
                style={{ margin: 0 }}
              >Image</h5>
            <div style={{ padding: '20px', border: '1px solid', borderRadius: '10px', margin: '20px' }}>

              <input

                type='file'
                onChange={(e: ChangeEvent) =>
                  setImg(
                    (e.target as HTMLInputElement)!.files![0]
                  )
                }
              />
            </div>
            <button
              type='submit'
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              style={{ border: '1px solid' }}
            >
              Submit
            </button>
          </form>
        </div>

        {
          loading &&
          <>
          <div style={{marginTop: '30px'}}>
          <b> It may take some while to process the request for first time, as the free server sleeps after long inactivity. </b>
          </div>
          <div className='center'>
       
            <div>
  
              <div className="loader"></div>
            </div>
          </div>
          </>
        }

        {og &&
          <div
            style={{ paddingTop: 30 }}
          >
            <img
              src={og}
            />

          </div>}
      </div>
    </>
  )
}

export default App
