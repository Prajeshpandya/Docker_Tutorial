
export default function Home() {
  return (
    <div>
      <form className="bg-black " action={
        async(formData)=>{
          "use server";
          try {
            const name = formData.get("name") as string | undefined;
            const email = formData.get("email") as string | undefined;

            if(!name || !email){
              return alert("Please fill the fields!")
            }

            const res = await fetch(
              `${process.env.SERVER_URL}/newuser?name=${name}&email=${email}`,{
                cache:"no-cache"
              }
            )

            const data =await res.json()

            console.log(data)

          } catch (error) {
              console.log(error) 
          }
        }
      }>
        <input type="text" placeholder='Name' name='name' required />
        <input type="email" placeholder='Email' name='email' required />

        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
