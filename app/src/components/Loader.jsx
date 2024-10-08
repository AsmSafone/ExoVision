import React from "react";
import styled from "styled-components";

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="rocket">
                <div className="rocket-body">
                    <div className="body" />
                    <div className="fin fin-left" />
                    <div className="fin fin-right" />
                    <div className="window" />
                </div>
                <div className="exhaust-flame" />
                <ul className="exhaust-fumes">
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                </ul>
                <ul className="star">
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                </ul>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .rocket {
  position: absolute;
  top: 20%;
  width: 80px;
  left: calc(50% - 40px);
  animation: fly-up 4s ease-in-out forwards;
}


@keyframes fly-up {
    0% {
      top: 20%;
    }
    100% {
      top: -100%;
    }
  }
  @keyframes fire-explosion {
    0% {
        height: 20px;
        width: 20px;
        background: radial-gradient(circle, rgba(255,255,255,1) 10%, rgba(255,200,0,1) 30%, rgba(255,87,34,1) 60%, rgba(183,28,28,1) 100%);
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    30% {
        height: 60px;
        width: 30px;
        background: radial-gradient(circle, rgba(255,255,255,1) 10%, rgba(255,152,0,1) 40%, rgba(255,87,34,1) 80%, rgba(183,28,28,1) 100%);
        opacity: 0.8;
        transform: scale(1.2) translateY(20px);
    }
    60% {
        height: 100px;
        width: 40px;
        background: radial-gradient(circle, rgba(255,255,255,0.9) 5%, rgba(255,87,34,1) 60%, rgba(183,28,28,1) 100%);
        opacity: 0.6;
        transform: scale(1.4) translateY(50px);
    }
    100% {
        height: 150px;
        width: 50px;
        background: radial-gradient(circle, rgba(255,255,255,0.7) 5%, rgba(255,87,34,1) 40%, rgba(183,28,28,1) 100%);
        opacity: 0;
        transform: scale(1.8) translateY(80px);
    }
}

  
  
.rocket .rocket-body {
  width: 80px;
  left: calc(50% - 50px);
  animation: bounce 0.5s infinite;
}

.rocket .rocket-body .body {
  background-color: #dadada;
  height: 180px;
  left: calc(50% - 50px);
  border-top-right-radius: 100%;
  border-top-left-radius: 100%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top: 5px solid #f5f5f5;
}

.rocket .rocket-body:before {
  content: '';
  position: absolute;
  left: calc(50% - 24px);
  width: 48px;
  height: 13px;
  background-color: #554842;
  bottom: -13px;
  border-bottom-right-radius: 60%;
  border-bottom-left-radius: 60%;
}

.rocket .window {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #a75248;
  left: calc(50% - 25px);
  top: 40px;
  border: 5px solid #b4b2b2;
}

.rocket .fin {
  position: absolute;
  z-index: -100;
  height: 55px;
  width: 50px;
  background-color: #a75248;
}

.rocket .fin-left {
  left: -30px;
  top: calc(100% - 55px);
  border-top-left-radius: 80%;
  border-bottom-left-radius: 20%;
}

.rocket .fin-right {
  right: -30px;
  top: calc(100% - 55px);
  border-top-right-radius: 80%;
  border-bottom-right-radius: 20%;
}

.rocket .exhaust-flame {
    position: absolute;
    top: calc(100%); /* Keep the flame attached to the rocket */
    left: calc(50% - 20px); /* Center the flame */
    width: 40px;
    height: 150px;
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1) 10%,   /* White at the base */
        rgba(255, 152, 0, 0.9) 20%,   /* Yellow-orange gradient */
        rgba(255, 87, 34, 0.8) 60%,   /* Intense orange-red */
        rgba(183, 28, 28, 0.7) 100%   /* Red at the tip */
    );
    animation: fire-explosion 2s ease-in-out infinite;
    border-radius: 50% 50% 20% 20%;  /* Gives the flame a tapered, rounded shape */
    transform-origin: top center;    /* Keeps the flame growing from the top */
}





.rocket .exhaust-fumes li {
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  list-style: none;
  position: absolute;
  border-radius: 100%;
}

.rocket .exhaust-fumes li:first-child {
  width: 200px;
  height: 200px;
  bottom: -300px;
  animation: fumes 5s infinite;
}

.rocket .exhaust-fumes li:nth-child(2) {
  width: 150px;
  height: 150px;
  left: -120px;
  top: 260px;
  animation: fumes 3.2s infinite;
}

.rocket .exhaust-fumes li:nth-child(3) {
  width: 120px;
  height: 120px;
  left: -40px;
  top: 330px;
  animation: fumes 3s 1s infinite;
}

.rocket .exhaust-fumes li:nth-child(4) {
  width: 100px;
  height: 100px;
  left: -170px;
  animation: fumes 4s 2s infinite;
  top: 380px;
}

.rocket .exhaust-fumes li:nth-child(5) {
  width: 130px;
  height: 130px;
  left: -120px;
  top: 350px;
  animation: fumes 5s infinite;
}

.rocket .exhaust-fumes li:nth-child(6) {
  width: 200px;
  height: 200px;
  left: -60px;
  top: 280px;
  animation: fumes2 10s infinite;
}

.rocket .exhaust-fumes li:nth-child(7) {
  width: 100px;
  height: 100px;
  left: -100px;
  top: 320px;
}

.rocket .exhaust-fumes li:nth-child(8) {
  width: 110px;
  height: 110px;
  left: 70px;
  top: 340px;
}

.rocket .exhaust-fumes li:nth-child(9) {
  width: 90px;
  height: 90px;
  left: 200px;
  top: 380px;
  animation: fumes 20s infinite;
}

.star li {
  list-style: none;
  position: absolute;
}

.star li:before, .star li:after {
  content: '';
  position: absolute;
  background-color: #f5f5f5;
}

.star li:before {
  width: 10px;
  height: 2px;
  border-radius: 50%;
}

.star li:after {
  height: 8px;
  width: 2px;
  left: 4px;
  top: -3px;
}

.star li:first-child {
  top: -30px;
  left: -210px;
  animation: twinkle 0.4s infinite;
}

.star li:nth-child(2) {
  top: 0;
  left: 60px;
  animation: twinkle 0.5s infinite;
}

.star li:nth-child(2):before {
  height: 1px;
  width: 5px;
}

.star li:nth-child(2):after {
  width: 1px;
  height: 5px;
  top: -2px;
  left: 2px;
}

.star li:nth-child(3) {
  left: 120px;
  top: 220px;
  animation: twinkle 1s infinite;
}

.star li:nth-child(4) {
  left: -100px;
  top: 200px;
  animation: twinkle 0.5s ease infinite;
}

.star li:nth-child(5) {
  left: 170px;
  top: 100px;
  animation: twinkle 0.4s ease infinite;
}

.star li:nth-child(6) {
  top: 87px;
  left: -79px;
  animation: twinkle 0.2s infinite;
}

.star li:nth-child(6):before {
  height: 1px;
  width: 5px;
}

.star li:nth-child(6):after {
  width: 1px;
  height: 5px;
  top: -2px;
  left: 2px;
}

@keyframes fumes {
  50% {
    transform: scale(1.5);
    background-color: transparent;
  }

  51% {
    transform: scale(0.8);
  }

  100% {
    background-color: #f5f5f5;
    transform: scale(1);
  }
}

@keyframes bounce {
  0% {
    transform: translate3d(0px, 0px, 0);
  }

  50% {
    transform: translate3d(0px, -4px, 0);
  }

  100% {
    transform: translate3d(0px, 0px, 0);
  }
}

@keyframes exhaust {
  0% {
    background: linear-gradient(to bottom, transparent 10%, #f5f5f5 100%);
  }

  50% {
    background: linear-gradient(to bottom, transparent 8%, #f5f5f5 100%);
  }

  75% {
    background: linear-gradient(to bottom, transparent 12%, #f5f5f5 100%);
  }
}

@keyframes fumes2 {
  50% {
    transform: scale(1.1);
  }
}

@keyframes twinkle {
  80% {
    transform: scale(1.1);
    opacity: 0.7;
  }
}
 
`;

export default Loader;
