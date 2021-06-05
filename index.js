"use strict";

class View {
	constructor(idElem) {
		this.domElem = document.getElementById(idElem);
		this.defaultValue = parseInt(
			window.getComputedStyle(this.domElem).fontSize
		);
		this.valueStep = document.getElementById("step");
		this.executeStep = document.getElementById("executeStep");
		this.minFontSizeValue = document.getElementById("minFontSizeValue");
		this.minFontSize = document.getElementById("minFontSize");
		this.maxFontSizeValue = document.getElementById("maxFontSizeValue");
		this.maxFontSize = document.getElementById("maxFontSize");
	}

	changeSize = (newValue) => {
		this.domElem.style.fontSize = `${newValue}px`;
	};
}

class Model {
	constructor(view) {
		this.view = view;
		this.currentValue = view.defaultValue;
		this.step = 1;
		this.valueMaxFontSize = Infinity;
		this.valueMinFontSize = -Infinity;
	}

	execStep = () => {
		this.inputValue = this.view.valueStep.value;
		this.inputValue = Number(this.inputValue);
		if (this.inputValue > 0) {
			this.step = this.inputValue;
		} else {
			alert("Введите значение больше 0");
		}
	}

	getMinFontSize = () => {
		this.view.minFontSizeValue = this.view.minFontSizeValue.value;
		this.valueMinFontSize = this.view.minFontSizeValue;
		this.valueMinFontSize = Number(this.valueMinFontSize);
	}

	getMaxFontSize = () => {
		this.view.maxFontSizeValue = this.view.maxFontSizeValue.value;
		this.valueMaxFontSize = this.view.maxFontSizeValue;
		this.valueMaxFontSize = Number(this.valueMaxFontSize);
	}

	checkInpuValue = () => {

	}

	increaseSize = () => {
		const newSize = this.currentValue + this.step;
		if (newSize < this.valueMaxFontSize) {
			this.view.changeSize(newSize);
			this.currentValue = newSize;
		} else if (this.valueMaxFontSize === 0 || false) {
			this.valueMaxFontSize = Infinity;
		} else {
			alert("Достигнуто максимальное значение");
			cbf();
		}
	};

	decreaseSize = () => {
		const newSize = this.currentValue - this.step;
		console.log(newSize);
		if (newSize > this.valueMinFontSize) {
			this.view.changeSize(newSize);
			this.currentValue = newSize;
		} else {
			alert("Достигнуто минимальное значение");
		}
	};
}

class Controller {
	constructor(view, model) {
		this.view = view;
		this.model = model;
	}

	eventWrapper(e, cb) {
		e.preventDefault();
		cb();
	}

	startToListen() {
		this.view.domElem.addEventListener("click", (e) =>
			this.eventWrapper(e, this.model.increaseSize)
		);
		this.view.domElem.addEventListener("contextmenu", (e) =>
			this.eventWrapper(e, this.model.decreaseSize)
		);
		this.view.executeStep.addEventListener("click", (e) => {
			this.model.execStep();
		});
		this.view.minFontSize.addEventListener("click", (e) => {
			this.model.getMinFontSize();
		});
		this.view.maxFontSize.addEventListener("click", (e) => {
			this.model.getMaxFontSize();
		});
	}
}

let view = new View("firstDiv");
let model = new Model(view);
let controller = new Controller(view, model);
controller.startToListen();