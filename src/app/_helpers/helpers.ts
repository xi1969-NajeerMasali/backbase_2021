import * as $ from 'jquery';
// import { DatePipe } from '@angular/common';
// import { STRING } from './constant/string';
// import * as XLSX from 'xlsx';
// import { isUndefined, isNullOrUndefined } from 'util';
import { AbstractControl, FormControl, FormGroup, FormArray } from '@angular/forms';
declare var $: $;
declare var jQuery: any;
declare function unescape(s: string): string;
// const STRING = Object.freeze({
// 	EMPTY_STRING: '',
// 	THREE_DOT: '...',
// 	COMMA_SPACE: ', ',
// 	FORWARD_SLASH: '/',
// 	UNDERSCORE: '_'
// });
declare function unescape(s: string): string;


interface ICalendarOptions {
	startDate?: Date;
	endDate?: Date;
	disabledDates?: Date[];
	defaultViewDate?: Date;
}
export class Helpers {
	static zoom_level = 100
	static openModal(modalId) {
		$(`#${modalId}`).modal({ backdrop: 'static', keyboard: false });
	}
	static openModalForEnrollemnt(modalId) {
		$(`#${modalId}`).modal({ keyboard: false });
	}
	static zoom_page(step, trigger) {
		// Zoom just to steps in or out
		if (Helpers.zoom_level >= 120 && step > 0 || Helpers.zoom_level <= 80 && step < 0) {
			return;
		}

		// Set / reset zoom
		if (step === 0) {
			Helpers.zoom_level = 100;
		} else {
			Helpers.zoom_level = Helpers.zoom_level + step;
		}
		// Set page zoom via CSS
		$('body').css({
			transform: 'scale(' + (Helpers.zoom_level / 100) + ')', // set zoom
			transformOrigin: '50% 0' // set transform scale base
		});

		// Adjust page to zoom width
		if (Helpers.zoom_level > 100) {
			$('body').css({ width: (Helpers.zoom_level * 1.2) + '%' });
		} else {
			$('body').css({ width: '100%' });
		}
		// Activate / deaktivate trigger (use CSS to make them look different)
		if (Helpers.zoom_level >= 120 || Helpers.zoom_level <= 80) {
			trigger.addClass('disabled');
		} else {
			trigger.parents('ul').find('.disabled').removeClass('disabled');
		}
		if (Helpers.zoom_level !== 100) {
			$('#zoom_reset').removeClass('disabled');
		} else {
			$('#zoom_reset').addClass('disabled');
		}
	}
	// static initZoom() {
	// 	$(document).ready(function (q) {
	// 		// Set initial zoom level
	// 		let zoom_level = 100;

	// 		// Click events
	// 		q('#zoom_in').click(function () { zoom_page(10, q(this)) });
	// 		q('#zoom_out').click(function () { zoom_page(-10, q(this)) });
	// 		q('#zoom_reset').click(function () { zoom_page(0, q(this)) });

	// 		// Zoom function
	// 		function zoom_page(step, trigger) {
	// 			// Zoom just to steps in or out
	// 			if (zoom_level >= 120 && step > 0 || zoom_level <= 80 && step < 0) {
	// 				return;
	// 			}

	// 			// Set / reset zoom
	// 			if (step === 0) {
	// 				zoom_level = 100;
	// 			} else {
	// 				zoom_level = zoom_level + step;
	// 			}
	// 			// Set page zoom via CSS
	// 			q('body').css({
	// 				transform: 'scale(' + (zoom_level / 100) + ')', // set zoom
	// 				transformOrigin: '50% 0' // set transform scale base
	// 			});

	// 			// Adjust page to zoom width
	// 			if (zoom_level > 100) {
	// 				q('body').css({ width: (zoom_level * 1.2) + '%' });
	// 			} else {
	// 				q('body').css({ width: '100%' });
	// 			}
	// 			// Activate / deaktivate trigger (use CSS to make them look different)
	// 			if (zoom_level >= 120 || zoom_level <= 80) {
	// 				trigger.addClass('disabled');
	// 			} else {
	// 				trigger.parents('ul').find('.disabled').removeClass('disabled');
	// 			}
	// 			if (zoom_level !== 100) {
	// 				q('#zoom_reset').removeClass('disabled');
	// 			} else {
	// 				q('#zoom_reset').addClass('disabled');
	// 			}
	// 		}
	// 	});
	// }
	// static trimFileName(fileName) {
	// 	const length = fileName.length;
	// 	if (length < 20) {
	// 		return fileName;
	// 	}
	// 	const startString = fileName
	// 		.split(STRING.EMPTY_STRING)
	// 		.slice(0, 10)
	// 		.join(STRING.EMPTY_STRING);
	// 	const endString = fileName
	// 		.split(STRING.EMPTY_STRING)
	// 		.slice(length - 7, length)
	// 		.join(STRING.EMPTY_STRING);
	// 	return startString + STRING.THREE_DOT + endString;
	// }
	static focuseOn(id) {
		if (id) {
			$(`#${id}`).focus();
		}
	}
	static toDateFromCalendar(date): Date {
		if (!date) {
			return null;
		}
		if (date instanceof Date) {
			return date;
		}
		date = String(date);
		if (date.indexOf('-') > 0) {
			return new Date(date);
		}
		date = date.split('/').reverse();
		if (date.length !== 3) {
			console.error('invalid date at Helpers/toDateFromCalendar', date);
		}
		const formattedDate = new Date(date[0], date[1] - 1, date[2]);
		// return new Date(date[0], date[1] - 1, date[2]);
		formattedDate.setHours(5);
		formattedDate.setMinutes(30);
		return formattedDate
	}
	static randomId() {
		const currentDate = new Date();
		const random = Math.floor((Math.random() * 100000) + 1);
		const id = `id_${random}_${currentDate.valueOf()}`;
		return id;
	}
	// static formatDuration(duration: any = {}, fromDate = 'fromDate', toDate = 'toDate') {
	// 	// const datePipe = new DatePipe('en-US');
	// 	const startDate = this.formatDateToView(duration[fromDate]);
	// 	const endDate = this.formatDateToView(duration[toDate]);
	// 	return `${startDate} - ${endDate}`;
	// }
	// static formatDateToView(date: Date) {
	// 	if (!date) {
	// 		return '';
	// 	}
	// 	date = new Date(date);
	// 	if (!date || isNaN(date.valueOf())) {
	// 		return '';
	// 	}
	// 	const datePipe = new DatePipe('en-US');
	// 	const formattedDate = datePipe.transform(date);
	// 	return formattedDate;
	// }
	static makeTimeZero(date: Date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	}
	static defineCalendar(startDate?: Date, endDate?: Date, opts: ICalendarOptions = {}) {
		const id = this.randomId();
		const defaultCalendarOptions = {
			todayHighlight: true,
			format: 'dd/mm/yyyy',
			orientation: 'bottom left',
			clearBtn: true,
			disableTouchKeyboard: false,
			autoclose: false,
			templates: {
				leftArrow: '<i class="la la-angle-left"></i>',
				rightArrow: '<i class="la la-angle-right"></i>'
			},
			startDate: startDate || new Date(1900, 1, 1),
			endDate: endDate
		};
		Object.assign(defaultCalendarOptions, opts);
		const calendar = () => $(`#${id}`).datepicker(defaultCalendarOptions);
		jQuery(document).ready(function () {
			calendar();
		});
		return id;
	}
	static toCalendarDate(date) {
		if (Date.parse(date)) {
			date = this.toDateFromCalendar(date);
			// date = new Date(date);
		}
		if (date instanceof Date) {
			const month = date.getMonth() + 1;
			const calendarDate = date.getDate();
			return (
				this.PadZeroStart(calendarDate) +
				'/' +
				this.PadZeroStart(month) +
				'/' +
				date.getFullYear()
			);
		}
		return date;
	}
	static toCalendarDateWithPreviousDay(date) {
		if (Date.parse(date)) {
			date = this.toDateFromCalendar(date);
			// date = new Date(date);
		}
		if (date instanceof Date) {
			const month = date.getMonth() + 1;
			const calendarDate = date.getDate() - 1;
			return (
				this.PadZeroStart(calendarDate) +
				'/' +
				this.PadZeroStart(month) +
				'/' +
				date.getFullYear()
			);
		}
		return date;
	}
	// static getFormGroup(formArray, path) {
	// 	const forms = formArray.forms;
	// 	const fullPath = path.split('.');
	// 	const formElementName = fullPath.pop();
	// 	const formName = fullPath.length ? fullPath.pop() : STRING.EMPTY_STRING;
	// 	const filteredForm = forms.filter(form => {
	// 		if (formName) {
	// 			return form.name === formName;
	// 		} else {
	// 			const formElements = form.formElements;
	// 			const isForm = formElements.find(f => f.name === path);
	// 			return isForm;
	// 		}
	// 	});
	// 	return filteredForm;
	// }
	// static mapObject(obj, mapping) {
	// 	for (const key in mapping) {
	// 		if (mapping.hasOwnProperty(key)) {
	// 			const objValue = this.getValueFromObject(obj, mapping[key]);
	// 			this.assignValue(obj, key, objValue);
	// 		}
	// 	}
	// 	return obj;
	// }
	static camelToTitleCase(text) {
		const result = text.replace(/([A-Z])/g, ' $1');
		const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
		return finalResult;
	}
	static calculateDuration(sDate, eDate) {
		// console.log('dates', sDate, eDate);
		const startDay = new Date(sDate).getTime();
		const endDay = new Date(eDate).getTime();
		const diff = startDay - endDay;
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
		// console.log(diffDays);
		return diffDays;
	}
	// static goToEndOfMonth(date: Date) {
	// 	date = new Date(date);
	// 	date.setMonth(date.getMonth() + 1)
	// 	date.setDate(1)
	// 	date.setDate(date.getDate() - 1)
	// 	return date;
	// }
	// static getValueFromObject(obj, path, defaultValue?: any) {
	// 	if (!(path instanceof Array) && path.indexOf('?') >= 0) {
	// 		path = [path];
	// 	}
	// 	if (path instanceof Array) {
	// 		const result = {};
	// 		path.map(p => {
	// 			let finalPath = p.split('?').pop();
	// 			if (finalPath && finalPath === p) {
	// 				finalPath = p.split('.').pop();
	// 			} else {
	// 				p = p.split('?');
	// 				p.pop();
	// 				p = p.join('?');
	// 			}
	// 			result[finalPath] = this.getValueFromObject(obj, p);
	// 		});
	// 		return result;
	// 	}
	// 	obj = this.copyObj(obj);
	// 	const value = {};
	// 	path = path.split('.');
	// 	path.map(key => {
	// 		obj = obj && obj[key];
	// 	});
	// 	return isNullOrUndefined(obj) ? defaultValue : obj;
	// }
	static assignValue(obj, path, value) {
		path = path.split('.');
		const finalPath = path.pop();
		path.map(key => {
			obj[key] = obj[key] || {};
			obj = obj[key];
		});
		obj[finalPath] = value;
	}
	static PadZeroStart(string, n = 2) {
		string = string.toString();
		return string.padStart(n, 0);
	}
	static closeModal(modalId) {
		$(`#${modalId}`).modal('hide');
	}
	static copyArray(arr1, arr2) {
		arr1.splice(0);
		arr1.push.apply(arr1, arr2);
	}
	static emptyArray(...arr) {
		for (const array of arr) {
			this.copyArray(array, []);
		}
	}
	static toCamelCase(str: string) {
		str = str.trim();
		if (!str) {
			return null;
		}
		const camelCase = str
			.split(' ')
			.map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
			.join('');
		return camelCase[0].toLowerCase() + camelCase.substr(1);
	}
	static serialize(obj: any) {
		const str = [];
		for (const p in obj) {
			if (obj.hasOwnProperty(p)) {
				str.push(
					encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
				);
			}
		}
		return str.join('&');
	}
	static giveDefaultValues(targetObj, defaultValueObj) {
		Object.keys(defaultValueObj).map(key => {
			targetObj[key] = targetObj[key]
				? targetObj[key]
				: defaultValueObj[key];
		});
	}
	// static beforeClose() {
	// 	$(window).on('beforeunload', function () {
	// 		return 'Do you really want to close?';
	// 	});
	// }
	// static loadStyles(tag, src) {
	// 	if (Array.isArray(src)) {
	// 		$.each(src, function (k, s) {
	// 			$(tag).append(
	// 				$('<link/>')
	// 					.attr('href', s)
	// 					.attr('rel', 'stylesheet')
	// 					.attr('type', 'text/css')
	// 			);
	// 		});
	// 	} else {
	// 		$(tag).append(
	// 			$('<link/>')
	// 				.attr('href', src)
	// 				.attr('rel', 'stylesheet')
	// 				.attr('type', 'text/css')
	// 		);
	// 	}
	// }
	// static isValidValue(value) {
	// 	return value || typeof value === 'boolean' || !isNullOrUndefined(value);
	// }

	static copyDate(to: Date, from: Date) {
		to.setDate(from.getDate());
		to.setMonth(from.getMonth());
		to.setFullYear(from.getFullYear());
		to.setHours(from.getHours());
		to.setMinutes(from.getMinutes());
		to.setSeconds(from.getSeconds());
		to.setMilliseconds(from.getMilliseconds());
		return to;
	}
	static copyObj(obj) {
		if (!obj) {
			return {};
		}
		const cache = [];
		const copiedObj = JSON.parse(
			JSON.stringify(obj, function (key, value) {
				if (typeof value === 'object' && value !== null) {
					if (cache.indexOf(value) !== -1) {
						// Circular reference found, discard key
						return;
					}
					// Store value in our collection
					cache.push(value);
				}
				return value;
			})
		);
		return copiedObj;
	}

	// static unwrapTag(element) {
	// 	$(element)
	// 		.removeAttr('appunwraptag')
	// 		.unwrap();
	// }

	/**
	 * Set title markup
	 * @param title
	 */
	// static setTitle(title) {
	// 	$('.m-subheader__title').text(title);
	// }

	/**
	 * Breadcrumbs markup
	 * @param breadcrumbs
	 */
	// static setBreadcrumbs(breadcrumbs) {
	// 	if (breadcrumbs) {
	// 		$('.m-subheader__title').addClass('m-subheader__title--separator');
	// 	}

	// 	let ul = $('.m-subheader__breadcrumbs');

	// 	if ($(ul).length === 0) {
	// 		ul = $('<ul/>')
	// 			.addClass('m-subheader__breadcrumbs m-nav m-nav--inline')
	// 			.append(
	// 				$('<li/>')
	// 					.addClass('m-nav__item')
	// 					.append(
	// 						$('<a/>')
	// 							.addClass('m-nav__link m-nav__link--icon')
	// 							.append(
	// 								$('<i/>').addClass(
	// 									'm-nav__link-icon la la-home'
	// 								)
	// 							)
	// 					)
	// 			);
	// 	}

	// 	$(ul)
	// 		.find('li:not(:first-child)')
	// 		.remove();
	// 	$.each(breadcrumbs, function (k, v) {
	// 		const li = $('<li/>')
	// 			.addClass('m-nav__item')
	// 			.append(
	// 				$('<a/>')
	// 					.addClass('m-nav__link m-nav__link--icon')
	// 					.attr('routerLink', v.href)
	// 					.attr('title', v.title)
	// 					.append(
	// 						$('<span/>')
	// 							.addClass('m-nav__link-text')
	// 							.text(v.text)
	// 					)
	// 			);
	// 		$(ul)
	// 			.append(
	// 				$('<li/>')
	// 					.addClass('m-nav__separator')
	// 					.text('-')
	// 			)
	// 			.append(li);
	// 	});
	// 	$('.m-subheader .m-stack__item:first-child').append(ul);
	// }

	static setLoading(enable) {
		const body = $('body');
		if (enable) {
			$(body).addClass('m-page--loading-non-block');
		} else {
			$(body).removeClass('m-page--loading-non-block');
		}
	}

	static bodyClass(strClass) {
		$('body').attr('class', strClass);
	}

	static openInNewTab(url) {
		const win = window.open(url, '_blank');
		win.focus();
	}


	static toBackendQuery(query: any) {
		let value = '';
		for (const key in query) {
			if (!query.hasOwnProperty(key)) {
				continue;
			}
			value += (key + ':' + query[key] + ',');
		}
		if (value) {
			const valueArr = value.split('');
			valueArr.splice(valueArr.length - 1, 1);
			value = valueArr.join('');
		}
		return value;
	}

	static parseQueryFromUrl(url: string): any {
		const queryString = url.split('?')[1]
		const query = {}
		if (!queryString) {
			return query
		};

		const vars = queryString.split('&');
		for (let i = 0; i < vars.length; i++) {
			const pair = vars[i].split('=');
			const key = decodeURIComponent(pair[0]);
			const value = decodeURIComponent(pair[1]);
			query[key] = value;
			// if (decodeURIComponent(pair[0]) == variable) {
			// 	return decodeURIComponent(pair[1]);
			// }
		}
		return query;
		// console.log('Query variable %s not found', variable);
	}
	// static dateToNormalString(date: Date) {
	// 	return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
	// }
	static isEmptyObj(obj) {
		return !obj || Helpers.compareObj(obj, {});
	}
	static compareObj(...objects) {
		let i, l, leftChain, rightChain;

		function compare2Objects(x, y) {
			let p;

			// remember that NaN === NaN returns false
			// and isNaN(undefined) returns true
			if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
				return true;
			}

			// Compare primitives and functions.
			// Check if both objects link to the same object.
			// Especially useful on the step where we compare prototypes
			if (x === y) {
				return true;
			}

			// Works in case when functions are created in constructor.
			// Comparing dates is a common scenario. Another built-ins?
			// We can even handle functions passed across iframes
			if ((typeof x === 'function' && typeof y === 'function') ||
				(x instanceof Date && y instanceof Date) ||
				(x instanceof RegExp && y instanceof RegExp) ||
				(x instanceof String && y instanceof String) ||
				(x instanceof Number && y instanceof Number)) {
				return x.toString() === y.toString();
			}

			// At last checking prototypes as good as we can
			if (!(x instanceof Object && y instanceof Object)) {
				return false;
			}

			if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
				return false;
			}

			if (x.constructor !== y.constructor) {
				return false;
			}

			if (x.prototype !== y.prototype) {
				return false;
			}

			// Check for infinitive linking loops
			if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
				return false;
			}

			// Quick checking of one object being a subset of another.
			// todo: cache the structure of objects[0] for performance
			for (p in y) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}
			}

			for (p in x) {
				if (!x.hasOwnProperty(p)) {
					continue
				}
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				} else if (typeof y[p] !== typeof x[p]) {
					return false;
				}

				switch (typeof (x[p])) {
					case 'object':
					case 'function':

						leftChain.push(x);
						rightChain.push(y);

						if (!compare2Objects(x[p], y[p])) {
							return false;
						}

						leftChain.pop();
						rightChain.pop();
						break;

					default:
						if (x[p] !== y[p]) {
							return false;
						}
						break;
				}
			}

			return true;
		}

		if (objects.length < 1) {
			return true; // Die silently? Don't know how to handle such case, please help...
			// throw "Need two or more objects to compare";
		}

		for (i = 1, l = objects.length; i < l; i++) {

			leftChain = []; // Todo: this can be cached
			rightChain = [];

			if (!compare2Objects(objects[0], objects[i])) {
				return false;
			}
		}

		return true;
	}

	// static deriveNameFromS3Url(s3Url) {
	// 	if (!s3Url || (typeof s3Url !== STRING.STRING)) {
	// 		return STRING.EMPTY_STRING;
	// 	}
	// 	const s3UrlData = s3Url.split(STRING.FORWARD_SLASH);
	// 	const fullName = s3UrlData[s3UrlData.length - 1];
	// 	const nameData = fullName && fullName.split(STRING.UNDERSCORE);
	// 	nameData.splice(0, 1);
	// 	const name = nameData.join(STRING.UNDERSCORE);
	// 	const normalName = Helpers.removeQueryFromUrl(name);

	// 	// const name = nameData &&  nameData[nameData.length - 1];
	// 	// return name;
	// 	return normalName;
	// }

	static removeQueryFromUrl(url) {
		url = url.split('?');
		return url[0];
	}

	static copyFormControl(control: AbstractControl) {
		if (control instanceof FormControl) {
			return new FormControl(control.value);
		} else if (control instanceof FormGroup) {
			const copy = new FormGroup({});
			Object.keys(control.getRawValue()).forEach(key => {
				copy.addControl(key, this.copyFormControl(control.controls[key]));
			});
			return copy;
		} else if (control instanceof FormArray) {
			const copy = new FormArray([]);
			control.controls.forEach(perControl => {
				copy.push(this.copyFormControl(perControl));
			})
			return copy;
		}
	}
	static encrypt(planeString: string) {
		return btoa(unescape(encodeURIComponent(planeString)));
	}
	static markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach(control => {
			if (control.controls) { // control is a FormGroup
				this.markFormGroupTouched(control);
			} else { // control is a FormControl
				control.markAsTouched();
			}
		});
	}

	static calenderMonth(month) {
		return {
			'1': 'jan',
			'2': 'Feb',
			'3': 'March',
			'4': 'April',
			'5': 'May',
			'6': 'June',
			'7': 'July',
			'8': 'Aug',
			'9': 'Sep',
			'01': 'jan',
			'02': 'Feb',
			'03': 'March',
			'04': 'April',
			'05': 'May',
			'06': 'June',
			'07': 'July',
			'08': 'Aug',
			'09': 'Sep',
			'10': 'Oct',
			'11': 'Nov',
			'12': 'Dec'
		}[month]
	}

	// Convert number of months to year
	static monthsToYear(month) {
		const y = (month / 12);
		const mm = (month % 12);
		const ym = y.toExponential(2);
		return Math.round(Number(ym) * 100) / 100
	}

	static ordinal_suffix_of(i) {
		const j = i % 10,
			k = i % 100;
		if (j === 1 && k !== 11) {
			return i + 'st';
		}
		if (j === 2 && k !== 12) {
			return i + 'nd';
		}
		if (j === 3 && k !== 13) {
			return i + 'rd';
		}
		return i + 'th';
	}


	static replaceMulSpaces(string?) {
		if (string) {
			const removeWhiteSpaces = string.replace(/\s\s+/g, ' ');
			const splitToArray = removeWhiteSpaces.split('.');
			if (splitToArray.length > 0) {
				const joinString = splitToArray.join(' ');
				const semifinalCleanup = joinString.replace(/\s\s+/g, ' ');
				const finalCleanup = semifinalCleanup.trim();
				return finalCleanup;
			} else {
				const cleanUp = string.replace(/\s\s+/g, ' ');
				return cleanUp;
			}
		}
	}

	static aadharNumberFromRefKey(refKey) {
		if (refKey.length === 41) {
			const splitByDash = refKey.split('-');
			if (splitByDash && splitByDash.length > 0) {
				return 'XXXXXXXX' + splitByDash[5];
			} else {
				return 'Invalid Ref Key';
			}
		}
	}

	static removeTimeFromIsoDate(date) {
		let setHours = new Date(new Date(date).setHours(5))
		setHours = new Date(new Date(date).setMinutes(30))
		const setFinalHours = setHours.setHours(5)
		return new Date(setFinalHours).toISOString()
	}

	// static exportToExcel(tableId: string, name?: string) {
	// 	const timeSpan = new Date().toISOString();
	// 	const prefix = name || 'ExportResult';
	// 	const fileName = `${prefix}-${timeSpan}`;
	// 	const targetTableElm = document.getElementById(tableId);
	// 	// tslint:disable-next-line: no-angle-bracket-type-assertion
	// 	const wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
	// 	console.log(Object.keys(wb.Sheets[prefix]))
	// 	Object.keys(wb.Sheets[prefix]).forEach(res => {
	// 		const v = 'v';
	// 		if (
	// 			wb.Sheets[prefix][res][v] === 'Edit' || wb.Sheets[prefix][res][v] === 'edit' ||
	// 			wb.Sheets[prefix][res][v] === 'Actions' || wb.Sheets[prefix][res][v] === 'Upload File' || wb.Sheets[prefix][res][v] === 'Approve/RejectView Comments' || wb.Sheets[prefix][res][v] === 'Download File' ||
	// 			wb.Sheets[prefix][res][v] === 'View Comments' ||
	// 			wb.Sheets[prefix][res][v] === 'Delete' || wb.Sheets[prefix][res][v] === 'delete'
	// 		) {
	// 			delete wb.Sheets[prefix][res][v];
	// 		}
	// 	});
	// 	XLSX.writeFile(wb, `${fileName}.xlsx`);
	// 	return false;
	// }

	static calculateDurationInDays(sDate, eDate) {
		console.log('dates', sDate, eDate);
		const startDay = new Date(sDate).getTime();
		const endDay = new Date(eDate).getTime();
		const diff = endDay - startDay;
		const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
		console.log(diffDays);
		return diffDays;
	}
	static getMonthName(monthNumber) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const selectedMonthName = months[monthNumber - 1];
		return selectedMonthName;
	}

	// Make a Number with 2 decimal digit only
	static calcTheTwoDigitWithoutRoundOf(value) {
		if (typeof value !== 'number') {
			value = Number(value)
		}
		const num = value || 0;
		const with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
		return Number(with2Decimals);
	}
}
