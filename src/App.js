import { useEffect, useState } from "react";
import styled from "styled-components";
import { TwitterPicker } from "react-color";

function App() {
  const [topText, setTopText] = useState("");
  const [middleText, setMiddleText] = useState("");
  const [middleSecondText, setMiddleSecondText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageWidth, setImageWidth] = useState(1000);
  const [imageHeight, setImageHeight] = useState(380);
  const [downloadHref, setDownloadHref] = useState("");
  const [textFontSize, setTextFontSize] = useState("16");
  const [bgColor, setBgColor] = useState("#2196f3");
  const [textColor, setTextColor] = useState("#fff");

  useEffect(() => {
    let canvas = document.getElementById("imageCanvas");
    const ctx = canvas.getContext("2d");
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    // ctx.font = `${textFontSize}px Pretendard`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 0, 0, imageWidth, imageHeight);
    } else {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // 상단 텍스트 스타일
    ctx.fillStyle = textColor;
    ctx.font = `16px Pretendard`;
    ctx.fillText(topText, 75, 85);

    // 중단 텍스트 스타일
    ctx.font = `700 40px Pretendard`;
    ctx.fillText(middleText, 75, 150);
    ctx.font = `bold 40px Pretendard`;
    ctx.fillText(middleSecondText, 75, 200);

    // 하단 텍스트 스타일
    ctx.font = `500 18px Pretendard`;
    ctx.fillText(bottomText, 75, 250);

    const href = canvas.toDataURL();
    setDownloadHref(href);
  }, [
    topText,
    middleText,
    middleSecondText,
    bottomText,
    uploadedImage,
    textFontSize,
    imageHeight,
    imageWidth,
    bgColor,
    textColor,
  ]);

  const handleImage = (e) => {
    var canvas = document.getElementById("imageCanvas");
    var ctx = canvas.getContext("2d");
    let reader = new FileReader();
    reader.onload = (event) => {
      // reader가 load되면 실행
      let bgImg = new Image();
      bgImg.onload = () => {
        canvas.width = 1000;
        canvas.height = 380;
        ctx.drawImage(bgImg, 0, 0, 1000, 380);
        setImageWidth(1000);
        setImageHeight(380);
      };
      bgImg.src = event.target.result;
      setUploadedImage(bgImg);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleBgColor = (color) => {
    setBgColor(color.hex);
  };

  return (
    <Container>
      <h1>아이웨딩 메인 배너 생성기</h1>
      <form>
        <canvas id="imageCanvas" width="1000" height="380"></canvas>

        <div className="btn_box">
          <label htmlFor="imageLoader">배경 이미지 업로드</label>
          <a href={downloadHref} download="thumbnail.jpg">
            이미지 다운로드
          </a>
          <span onClick={() => setUploadedImage("")}>이미지 제거</span>
        </div>
        <input
          type="file"
          id="imageLoader"
          name="imageLoader"
          hidden
          onChange={handleImage}
        />
      </form>

      <div className="input_box">
        <div className="input_line">
          <label htmlFor="top">상단 텍스트</label>
          <input
            onChange={(e) => {
              setTopText(e.target.value);
            }}
            type="text"
            value={topText}
            id="top"
            placeholder="상단 문구를 입력하세요"
          />
        </div>
        <div className="input_line">
          <label htmlFor="middleFirst">중간 윗줄 텍스트</label>
          <input
            onChange={(e) => {
              setMiddleText(e.target.value);
            }}
            type="text"
            value={middleText}
            id="middleFirst"
            placeholder="중간 문구를 입력하세요"
          />
        </div>
        <div className="input_line">
          <label htmlFor="middleSecond">중간 아랫줄 텍스트</label>
          <input
            onChange={(e) => {
              setMiddleSecondText(e.target.value);
            }}
            type="text"
            value={middleSecondText}
            id="middleSecond"
            placeholder="중간 두번째 줄 문구를 입력하세요"
          />
        </div>
        <div className="input_line">
          <label htmlFor="bottom">하단 텍스트</label>
          <input
            onChange={(e) => {
              setBottomText(e.target.value);
            }}
            type="text"
            value={bottomText}
            id="bottom"
            placeholder="하단 문구를 입력하세요"
          />
        </div>

        <div className="select_color_box">
          <p>텍스트 컬러를 선택하세요</p>
          <button onClick={() => setTextColor("#000")}>black</button>
          <button onClick={() => setTextColor("#fff")}>white</button>
        </div>

        <div className="select_bgcolor_box">
          <p>
            이미지를 업로드 하지 않을 경우,
            <br />
            단색 배경색을 선택해주세요
          </p>
          <TwitterPicker color={bgColor} onChangeComplete={handleBgColor} />
        </div>
      </div>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  > h1 {
    color: #fff;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
  }
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width: 100%;
    background-color: #222933;
    border: 1px solid #000;
    canvas {
      position: relative;
      width: 1000px;
      height: 380px;
      margin: 0 auto 30px auto;
    }
    .btn_box {
      display: flex;
      align-items: center;
      margin: 0 auto;
      > a,
      > label,
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 50px;
        background-color: #222933;
        border: 1px solid #000;
        border-radius: 8px;
        cursor: pointer;
      }
      > label {
        margin-right: 15px;
      }
      > a {
        background-color: #222933;
        margin-right: 15px;
      }
    }
  }
  .input_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1000px;
    margin: 20px auto 0 auto;
    .input_line,
    .select_color_box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1000px;
      margin-bottom: 10px;
      label {
        width: 150px;
        color: #fff;
        margin-right: 10px;
        text-align: right;
      }
      input {
        display: flex;
        align-items: center;
        width: 500px;
        height: 50px;
        border-radius: 6px;
        color: #fff;
        background-color: #222933;
        border: 1px solid #000;
        padding-left: 15px;
      }
    }
    .select_color_box {
      margin-top: 10px;
      display: flex;
      align-items: center;
      > p {
        text-align: center;
        margin-right: 10px;
      }
      > button {
        width: 100px;
        height: 30px;
        border: 1px solid #000;
        background-color: #000;
        color: #fff;
        margin-right: 5px;
        border-radius: 8px;
        &:last-child {
          background-color: #fff;
          color: #000;
        }
      }
    }
    .select_bgcolor_box {
      display: flex;
      align-items: center;
      margin-top: 20px;
      > p {
        margin-right: 20px;
      }
      .block-picker {
      }
    }
  }
`;
