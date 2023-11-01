import { useState } from "react";

interface ButtonsProps {
  resetItemList: () => void;
  handleWheelClick: (e: any) => void;
}

const Buttons = ({ resetItemList, handleWheelClick }: ButtonsProps) => {
  const [showModal, setShowModal] = useState(false);

  const shareOptions = [
    {
      name: "Twitter",
      background: "url(/twitter.png)",
      url: "https://twitter.com/intent/tweet?url=",
    },
    {
      name: "WhatsApp",
      background: "url(/whatsapp.png)",
      url: "https://wa.me/?text=",
    },
    {
      name: "Facebook",
      background: "url(/facebook.png)",
      url: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
      name: "Discord",
      background: "url(/discord.png)",
      url: "https://discord.com/channels/@me/",
    },
    {
      name: "LinkedIn",
      background: "url(/linkedin.png)",
      url: "",
    },
    {
      name: "Pinterest",
      background: "url(/pinterest.png)",
      url: "https://www.pinterest.com/pin/create/button/?url=",
    },
  ];

  const handleShareModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex flex-row items-center justify-between w-full my-3">
      <button
        className="font-bold py-2 px-2 pl-6 w-[30%] neobrutal"
        onClick={resetItemList}
      >
        Clear
      </button>
      <button
        className="font-bold py-2 px-2 pl-6 w-[30%] neobrutal"
        onClick={handleWheelClick}
      >
        Start
      </button>
      <button
        className="font-bold py-2 px-2 pl-6 w-[30%] neobrutal"
        onClick={handleShareModal}
      >
        Share
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl px-4">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none neobrutal">
                <div className="flex items-start justify-between p-6 pb-1 rounded-t">
                  <h3 className="text-xl font-semibold">Share</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                      style={{
                        transform: "rotate(45deg)",
                      }}
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                    </svg>
                  </button>
                </div>
                <div className="relative p-6 py-2 flex-auto">
                  <div className="flex flex-wrap justify-center align-middle">
                    {shareOptions.map((option) => (
                      <button
                        key={option.name}
                        className="m-2 p-2 neobrutal"
                        style={{
                          height: "80px",
                          width: "80px",
                          backgroundImage: `${option.background}`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "50%",
                        }}
                        onClick={() =>
                          window.open(
                            option.url + window.location.href,
                            "_blank"
                          )
                        }
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default Buttons;
