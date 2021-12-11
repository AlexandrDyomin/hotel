class DateOfBirth {
  year = null;
  month = null;
  day = null;
  maxNumberOfDaysInMonth = {
   1: 30, 2: 29, 3: 31, 4: 30,
   5: 31, 6: 30, 7: 31, 8: 31,
   9: 30, 10: 31, 11: 30, 12: 31 
  }

  isLeapYear(year) {
    if ( !year ) return false;
    return ( ( year % 4 === 0 ) && ( year % 100 !== 0 ) ) || ( year % 400 === 0 );
  }

  setDay( day ) {
    let is29Feb = day === 29 && this.month === 2;
    if ( is29Feb && this.year ) {
      let isLeapYear = this.isLeapYear( this.year );
      return this.day = ( isLeapYear ) ? day : null;
    }

    if ( this.month ) {
      this.day = ( day <= this.maxNumberOfDaysInMonth[this.month] ) ? day : null;
    } else {
      this.day = ( day > 0 && day <= 31 ) ? day : null;
    }
  }

  setMonth ( month ) {
    let is29Feb = this.day === 29 && month === 2;
    if ( is29Feb && this.year ) {
      let isLeapYear = this.isLeapYear( this.year );
      return this.month = ( isLeapYear ) ? month : null;
    }

    if ( this.day ) {
      this.month = (  this.day <= this.maxNumberOfDaysInMonth[month] ) ? month : null;
    } else {
      this.month = ( month > 0 && month <= 12 ) ? month: null;
    }
  }

  setYear( year ) {
    let is29Feb = this.day === 29 && this.month === 2;
    if ( is29Feb ) {
      this.year = ( this.isLeapYear(year) ) ? year : null;
    } else {
      this.year = ( year >= 1900 ) ? year : null;
    }
  }

  reset() {
    this.year = null, this.month = null, this.day = null;
  }

}

export { DateOfBirth };