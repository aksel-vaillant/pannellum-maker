import React from "react";

export default function Help(props) {

    
    const [name, setName] = React.useState();
    const [mail, setMail] = React.useState();
    const [cc, setCC] = React.useState(true);
    const [body, setBody] = React.useState();

    const handleSummit = (e) => {
        let defaultBody = "From " + name + " [" + mail + "],\n\n";
        defaultBody += "My message :\n\n";
        defaultBody += body;

        let mailCC = (cc===true)? "?cc=" + mail + "&": "?";

        window.location.href = "mailto:aksel.vaillant@outlook.fr"+ mailCC +"subject=Message from Pannellum&body=" + encodeURI(defaultBody);
    }

  return (
    <>
        <div className="mt-5 mb-16 text-gray-800">
        <h2 className="text-3xl font-bold">Frequently asked questions</h2>
        <p className="mb-12 mt-5">
          Here we have some of the most frequently asked questions.
          <br />
          If you need any further information not listed in here, please contact
          us at hello@pixexid.com.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="mb-12">
            <p className="font-bold mb-4">
              Anim pariatur cliche reprehenderit?
            </p>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
              autem numquam dolore molestias aperiam culpa alias veritatis
              architecto eos, molestiae vitae ex eligendi libero eveniet
              dolorem, doloremque rem aliquid perferendis.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4">
              Non cupidatat skateboard dolor brunch?
            </p>
            <p className="text-gray-500">
              Distinctio corporis, iure facere ducimus quos consectetur ipsa ut
              magnam autem doloremque ex! Id, sequi. Voluptatum magnam sed fugit
              iusto minus et suscipit? Minima sunt at nulla tenetur, numquam
              unde quod modi magnam ab deserunt ipsam sint aliquid dolores
              libero repellendus cupiditate mollitia quidem dolorem odit
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4">
              Praesentium voluptatibus temporibus consequatur non aspernatur?
            </p>
            <p className="text-gray-500">
              Minima sunt at nulla tenetur, numquam unde quod modi magnam ab
              deserunt ipsam sint aliquid dolores libero repellendus cupiditate
              mollitia quidem dolorem.
            </p>
          </div>

          <div className="col-md-12 mb-12">
            <p className="font-bold mb-4">
              Voluptatum magnam sed fugit iusto minus et suscipit?
            </p>
            <p className="text-gray-500">
              Laudantium perferendis, est alias iure ut veniam suscipit dolorem
              fugit. Et ipsam corporis earum ea ut quae cum non iusto blanditiis
              ipsum dolor eius reiciendis, velit adipisci quas.
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4">Minima sunt at nulla tenetur,?</p>
            <p className="text-gray-500">
              Numquam unde quod modi magnam ab deserunt ipsam sint aliquid
              dolores libero repellendus cupiditate mollitia quidem dolorem odit
            </p>
          </div>

          <div className="mb-12">
            <p className="font-bold mb-4">
              Distinctio corporis, iure facere ducimus?
            </p>
            <p className="text-gray-500">
              Eaque eos corrupti debitis tenetur repellat, beatae quibusdam
              incidunt, fuga non iste dignissimos officiis nam officia obcaecati
              commodi ratione qui nesciunt.
            </p>
          </div>
        </div>
        </div>

        <div className="my-24 px-6">
            <section className="mb-32 text-center text-gray-800">
            <div className="max-w-[700px] mx-auto px-3 lg:px-6">
                <h2 className="text-3xl font-bold mb-12">Contact us</h2>
                <form>
                <div className="form-group mb-6">
                    <input
                    type="text"
                    className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    id="exampleInput7"
                    placeholder="Name"
                    />
                </div>
                <div className="form-group mb-6">
                    <input
                    type="email"
                    className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => {
                        setMail(e.target.value);
                    }}
                    id="exampleInput8"
                    placeholder="Email address"
                    />
                </div>
                <div className="form-group mb-6">
                    <textarea
                    className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
                    id="exampleFormControlTextarea13"
                    rows="3"
                    placeholder="Message"
                    onChange={(e) => {
                        setBody(e.target.value);
                    }}
                    ></textarea>
                </div>
                <div className="form-group form-check text-center mb-6">
                    <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck87"
                    defaultChecked
                    onChange={(e) => {
                        setCC(e.target.checked);
                    }}
                    />
                    <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck87"
                    >
                    Send me a copy of this message
                    </label>
                </div>
                <button
                    type="submit"
                    className="
            w-full
            px-6
            py-2.5
            mb-32
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-blue-800 active:shadow-lg
            transition
            duration-150
            ease-in-out"
                    onClick={handleSummit}
                >
                    Send
                </button>
                </form>
            </div>
            </section>
        </div>
    </>
  );
}
