import AbiERC20 from "../artifacts/contracts/BeNFT.sol/BeNFT.json";
import { ethers } from "ethers";
import ENV from "../utils/env";
async function GetBalance(provider, wallet, token) {
  let contract = new ethers.Contract(token, AbiERC20.abi, provider);
  let Tokens = await contract.balanceOf(wallet);
  return Tokens;
}

async function Allowance(Provider, Wallet, contract, token) {
  let SC = new ethers.Contract(token, AbiERC20.abi, Provider);
  let allowance = await SC.allowance(Wallet, contract);
  return allowance.toString();
}

async function Approve(provider, address, token) {
  // await provider.send("eth_requestAccounts", []);
  let signer = provider.getSigner();
  let contract = new ethers.Contract(token, AbiERC20.abi, signer);
  let result = await contract.approve(
    address,
    "99999999999999999999999999999999999999999999999999999999999"
  );
  let tx = await result.wait();
  return tx;
}

function MModeTimer(remainingTime) {
  var currentTime = new Date().getTime() / 1000;
  var futureTime = remainingTime;
  var timeRemaining = futureTime - currentTime;
  var minute = 60;
  var hour = 60 * 60;
  var day = 60 * 60 * 24;
  var dayFloor = Math.floor(timeRemaining / day);
  var hourFloor = Math.floor((timeRemaining - dayFloor * day) / hour);
  var minuteFloor = Math.floor(
    (timeRemaining - dayFloor * day - hourFloor * hour) / minute
  );
  var secondFloor = Math.floor(
    timeRemaining - dayFloor * day - hourFloor * hour - minuteFloor * minute
  );
  if (dayFloor < 0 || hourFloor < 0 || secondFloor < 0 || minuteFloor < 0) {
    return false;
  } else {
    if (futureTime > currentTime) {
      return (
        <p className="text-button-remaining">
          <span id="days">{dayFloor > 0 ? dayFloor : 0}</span> days /{" "}
          <span id="hours">{hourFloor > 0 ? hourFloor : 0}</span> hours /{" "}
          <span id="minutes">{minuteFloor > 0 ? minuteFloor : 0}</span> minutes
          / <span id="seconds">{secondFloor > 0 ? secondFloor : 0}</span>{" "}
          seconds to Claim
        </p>
      );
    }
  }
}

const formatMoney = (
  amount,
  moneda = "",
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
    }
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "") +
      " " +
      moneda
    );
  } catch (e) {
    console.log(e);
  }
};

const formatMoney2 = (
  amount,
  moneda = "",
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
    }
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 0 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount =
        Math.trunc(Math.abs(Number(amount) || 0) * Math.pow(10, decimalCount)) /
        Math.pow(10, decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "") +
      " " +
      moneda
    );
  } catch (e) {
    console.log(e);
  }
};

const convertToHex = (value) => {
  return `0x${Number(value).toString(16)}`;
};

function getChainIdBaseUrl(url) {
  return !url.includes("earn-strategies") ? ENV.chainId : ENV.depositChainId;
}

export {
  GetBalance,
  Allowance,
  Approve,
  MModeTimer,
  formatMoney,
  formatMoney2,
  convertToHex,
  getChainIdBaseUrl,
};
