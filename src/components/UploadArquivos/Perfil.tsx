//import Slider from "@mui/material/Slider";
//import Typography from "@mui/material/Typography";
import { url } from "inspector";
import React, { MutableRefObject, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./perfil.scss";
import { GrFormClose} from "react-icons/gr";

interface PerfilProps {
  onChange: (file: File) => void;
}

const Perfil = React.forwardRef<HTMLInputElement, PerfilProps>(
  (props: any, ref) => {
    const myRef = React.useRef<HTMLInputElement>();

    const [imageSrc, setImageSrc] = useState<string>();
    const [crop, setCrop] = useState<any>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    const [aspect, setAspect] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>();
    const [croppedImage, setCroppedImage] = useState<any>();
    const [file, setFile] = useState<File>();

    const onCropChange = (crop: any) => {
      setCrop(crop);
    };

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
      console.log("Done");
      setCroppedAreaPixels(croppedAreaPixels);
    };

    const onZoomChange = (zoom: number) => {
      setZoom(zoom);
    };

    const showCroppedImage = async () => {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);

      let cropedFile = new File([blob], file!.name, { type: "image/png" });

      props.onChange(cropedFile);
    };

    const handleImgChange = (event: any) => {
      let target = event.target as HTMLInputElement;

      let filelist = target.files as FileList;

      let photo = filelist[0];

      var fr = new FileReader();
      fr.onload = function () {
        const blob = new Blob([new Uint8Array(fr.result as ArrayBuffer)], {
          type: photo.type,
        });

        setImageSrc(URL.createObjectURL(blob));
      };

      fr.readAsArrayBuffer(photo);

      setFile(photo);
    };

    return (
      <div className="modal-dialog perfil" role="document">
        <div
          style={{ margin: "0 auto", background: "white", top:-10 }}
          aria-label="Atualizar foto do perfil"
          role="dialog"
          className="l9j0dhe7 du4w35lb cjfnh4rs j83agx80 cbu4d94t lzcic4wl ni8dbmo4 stjgntxs oqq733wu cwj9ozl2 io0zqebd m5lcvass fbipl8qg nwvqtn77 nwpbqux9 iy3k6uwz e9a99x49 g8p4j16d bv25afu3 pwh3vvf2 k4urcfbm"
        >
       
          <div className="l9j0dhe7 cbu4d94t j83agx80">
            <div
              style={{ height: imageSrc ? "535px" : "auto" }}
              className="rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd gs1a9yip owycx6da btwxx1t3 hv4rvrfc dati1w0a ihqw7lf3 discj3wi dlv3wnog rl04r1d5 enqfppq2 muag1w35"
            >
              {imageSrc ? (
                <div className="App">
                  <div className="crop-container container-foto-img">
                    <Cropper
                      minZoom={1}
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspect}
                      restrictPosition={false}
                      onCropChange={onCropChange}
                      onCropComplete={onCropComplete}
                      onZoomChange={onZoomChange}
                      rotation={rotation}
                      cropShape="round"
                      showGrid={true}
                    />
                  </div>

                  <div style={{height:70}} className="controls">
                   

                    <div
                      aria-label="3"
                      style={{ width: "100%", textAlign: "right", marginBottom: 5}}
                    >
                      <button
                      style={{marginRight:20 }}
                        onClick={() => setImageSrc(undefined)}
                        className="btn btn-light btn-md"
                      >
                        Cancelar
                      </button>
                      <button
                        data-bs-dismiss="modal"
                        onClick={showCroppedImage}
                        className="btn btn-primary btn-md"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t d2edcug0 hpfvmrgz rj1gh0hx buofh1pr g5gj957u ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt">
                    <input
                      ref={(node) => {
                        if (node) {
                          (ref as MutableRefObject<HTMLInputElement>).current =
                            node;
                          myRef.current = node;
                        }
                      }}
                      onChange={handleImgChange}
                      accept="image/*,image/heif,image/heic"
                      className="mkhogb32"
                      type="file"
                    />
                    <div
                      onClick={() => myRef.current?.click()}
                      aria-label="Carregar foto"
                      className="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql abiwlrkh p8dawk7l lzcic4wl rq0escxv pq6dq46d cbu4d94t taijpn5t l9j0dhe7 k4urcfbm"
                      role="button"
                    >
                      <div
                        className="l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv d1544ag0 tw6a2znq oo1teu6h tv7at329"
                        style={{ background: "#E7F3FF", marginLeft: 30 }}
                      >
                        <div className="bp9cbjyn j83agx80 taijpn5t c4xchbtz by2jbhx6 a0jftqn4">
                          <div className="rq0escxv l9j0dhe7 du4w35lb d2edcug0 hpfvmrgz bp9cbjyn j83agx80 pfnyh3mw j5wkysh0 hytbnt81">
                            <i
                              data-visualcompletion="css-img"
                              className="hu5pjgll op6gxeva"
                              style={{
                                backgroundImage:
                                  "url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/JqM1IveTssD.png');",
                                backgroundPosition: "0px -1211px;",
                                backgroundSize: "auto;",
                                width: "16px;",
                                height: "16px;",
                                backgroundRepeat: "no-repeat",
                                display: "inline-block;",
                              }}
                            ></i>
                          </div>
                          <div className="rq0escxv l9j0dhe7 du4w35lb d2edcug0 hpfvmrgz bp9cbjyn j83agx80 pfnyh3mw j5wkysh0 hytbnt81">
                            <span
                              className="d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 d3f4x2em iv3no6db jq4qci2q a3bd9o3v lrazzd5p knomaqxo"
                              dir="auto"
                            >
                              <span className="a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ltmttdrg g0qnabr5">
                                Carregar foto
                              </span>
                            </span>
                          </div>
                        </div>
                        <div
                          className="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s"
                          data-visualcompletion="ignore"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 hpfvmrgz ph5uu5jm b3onmgus e5nlhep0 ecm0bbzt">
                    <span className="tojvnm2t a6sixzi8 abs2jz4q a8s20v7p t1p8iaqh k5wvi7nf q3lfd5jv pk4s997a bipmatt0 cebpdrjk qowsmv63 owwhemhu dp1hu0rb dhp61c6y iyyx5f41">
                      <div
                        aria-label="Editar miniatura"
                        className="oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of n00je7tq arfg74bv qs9ysxi8 k77z8yql abiwlrkh p8dawk7l lzcic4wl rq0escxv pq6dq46d cbu4d94t taijpn5t l9j0dhe7 k4urcfbm"
                        role="button"
                      >
                        <div className="l9j0dhe7 du4w35lb j83agx80 pfnyh3mw taijpn5t bp9cbjyn owycx6da btwxx1t3 kt9q3ron ak7q8e6j isp2s0ed ri5dt5u2 rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv tdjehn4e tv7at329 hv4rvrfc dati1w0a">
                          <div className="bp9cbjyn j83agx80 taijpn5t c4xchbtz by2jbhx6 a0jftqn4">
                            <div className="rq0escxv l9j0dhe7 du4w35lb d2edcug0 hpfvmrgz bp9cbjyn j83agx80 pfnyh3mw j5wkysh0 hytbnt81">
                              <i
                                data-visualcompletion="css-img"
                                className="hu5pjgll lzf7d6o1"
                                style={{
                                  backgroundImage:
                                    "url('https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/JqM1IveTssD.png');",
                                  backgroundPosition: "0px -1177px;",
                                  backgroundSize: "auto;",
                                  width: "16px;",
                                  height: "16px;",
                                  backgroundRepeat: "no-repeat;",
                                  display: "inline-block;",
                                }}
                              ></i>
                            </div>
                          </div>
                          <div
                            className="n00je7tq arfg74bv qs9ysxi8 k77z8yql i09qtzwb n7fi1qx3 b5wmifdl hzruof5a pmk7jnqg j9ispegn kr520xx4 c5ndavph art1omkt ot9fgl3s"
                            data-visualcompletion="ignore"
                          ></div>
                        </div>
                      </div>
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="a1zevxcz j83agx80">
              <div className="rpm2j7zs k7i0oixp gvuykj2m j83agx80 cbu4d94t ni8dbmo4 du4w35lb q5bimw55 ofs802cu pohlnb88 dkue75c7 mb9wzai9 d8ncny3e buofh1pr g5gj957u tgvbjcpo l56l04vs r57mb794 kh7kg01d eg9m0zos c3g1iek1 l9j0dhe7 k4xni2cv">
                <div
                  className="pwoa4pd7 mkhogb32 n7fi1qx3 datstx6m b5wmifdl pmk7jnqg kr520xx4 qgmjvhk0 art1omkt nw2je8n7 hhz5lgdu pyaxyem1"
                  data-visualcompletion="ignore"
                  data-thumb="1"
                  style={{ display: "none;", right: "0px;", height: "0px;" }}
                ></div>
                <div
                  className="rq0escxv mkhogb32 n7fi1qx3 b5wmifdl jb3vyjys ph5uu5jm qt6c0cv9 b3onmgus hzruof5a pmk7jnqg kr520xx4 enuw37q7 dpja2al7 art1omkt nw2je8n7 hhz5lgdu"
                  data-visualcompletion="ignore"
                  data-thumb="1"
                  style={{
                    display: "block",
                    right: "0px",
                    height: "0px",
                    transform:
                      "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(1.21273) translateZ(-0.212727px) translateZ(-2px);",
                  }}
                >
                  <div className="oj68ptkr jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc datstx6m k4urcfbm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Perfil;
