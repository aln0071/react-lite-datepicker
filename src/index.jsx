import React from 'react';
import './index.css';
const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
* @author Alan Kuriakose
*
* This is a custom date picker entirely made with basic components and is extremely customisable
*/

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      limit: new Date(props.limit?props.limit:'1900-01-01'),
      limitString: props.limit,
      date: props.limit? new Date(props.limit):new Date()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.clear !== prevState.clear || nextProps.limit !== prevState.limitString) {
      return ({
        clear: nextProps.clear,
        selectedDate: '',
        limit: new Date(nextProps.limit?nextProps.limit:'1900-01-01'),
        limitString: nextProps.limit,
        date: nextProps.limit? new Date(nextProps.limit):new Date()
      })
    }
    return null;
  }

  getEndDates(date) {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return ({
      firstDay: firstDay,
      lastDay: lastDay
    })
  }

  changeMonthAndYear(month, year) {
    this.setState({
      date: new Date(this.state.date.getFullYear()+(year || 0), this.state.date.getMonth()+month, 1)
    })
  }

  renderYears() {
    let years = []
    for(let year=this.state.limit.getFullYear();year<3000;year++) {
      years.push(
        <option key={year}>
          {year}
        </option>
      )
    }
    return years
  }

  setBackgroundColor(sampleDate, day) {
    let today = new Date();
    return (sampleDate.getFullYear()===today.getFullYear() && sampleDate.getMonth()===today.getMonth() && day===today.getDate())?'lightsteelblue':'none'
  }

  renderDates(sampleDate) {
    let givenLimit = this.state.limit;
    let endDates = this.getEndDates(sampleDate)
    let limit = endDates.lastDay.getDate()
    let offset = endDates.firstDay.getDay()
    let dates = []
    let temp = []
    while(offset--) {
      temp.push(
        <td key={'null'+offset}>
        </td>
      )
    }
    for(let date=1;date<=limit;date++) {
      temp.push(
        <td
          key={date}
          className={(sampleDate.getFullYear()===givenLimit.getFullYear() && sampleDate.getMonth()===givenLimit.getMonth() && date < givenLimit.getDate())?"date-disabled":"date"}
          style={{backgroundColor: this.setBackgroundColor(sampleDate, date)}}
          onClick={(e)=>{
            let temp = sampleDate.getFullYear()+'-'+('0'+(sampleDate.getMonth()+1)).slice(-2)+'-'+('0'+e.target.innerText).slice(-2)
            this.setState({
              selectedDate: temp,
              showDatePicker: false
            })
            this.props.onChange(temp)
          }}>
          {date}
        </td>
      )
      if(temp.length>=7) {
        dates.push(
          <tr key={32+date}>
            {temp}
          </tr>
        )
        temp = []
      }
    }
    dates.push(
      <tr key={'null'}>
        {temp}
      </tr>
    )
    return dates
  }

  render() {
    return(
      <div className={this.props.disabled?"disabledDatePicker" : "datePicker"}>
        <div className="outer-div">
          <input
            type="text"
            onFocus={()=>{
              this.setState({
                visited: true,
                placeholder: 'YYYY-MM-DD',
                showDatePicker: true
              })
            }}
            value={this.state.selectedDate || ''}
            placeholder={this.state.placeholder || ''}
            label={this.props.label}
            helperText={this.props.helperText}
            className={ (!this.state.selectedDate && this.props.required && this.state.visited && !this.state.showDatePicker) ? 'required-error-input' : ''}
            />
          <label className={ (this.state.selectedDate || this.state.showDatePicker) ? 'float-up': ((this.props.required && this.state.visited) ? 'required-error-label' : '') }>
            {this.props.label.concat(this.props.required?'*':'')}
          </label>
        </div>
        {this.state.showDatePicker &&
          <div style={{position: 'relative'}}>

            <div style={{zIndex:999, position:'absolute', backgroundColor:'white', top:'100%', left:'0%'}}>
              <table style={{backgroundColor:'#e6e6e6'}}>
                <tbody>
                  <tr style={{cursor:'default', backgroundColor:'lightgray'}}>
                    <th>
                      <span
                        className={this.state.date.getFullYear()===this.state.limit.getFullYear()&&this.state.date.getMonth()==this.state.limit.getMonth()?'disabled':'enabled'}
                        onClick={()=>this.changeMonthAndYear(-1)}>&#9664;</span>
                    </th>
                    <th colSpan={2}>
                      <select
                        value={months[this.state.date.getMonth()]}
                        onChange={(e)=>this.changeMonthAndYear(12-e.target.childElementCount+e.target.selectedIndex-this.state.date.getMonth())}>
                        {months.map(month=>
                          <option key={month} >
                            {month}
                          </option>
                        ).slice(this.state.limit.getFullYear()===this.state.date.getFullYear()?this.state.limit.getMonth():0)}
                      </select>
                    </th>
                    <th colSpan={2}>
                      <select
                        value={this.state.date.getFullYear()}
                        onChange={(e)=>this.changeMonthAndYear((e.target.selectedIndex===0 && this.state.limit.getMonth()>this.state.date.getMonth())?this.state.limit.getMonth()-this.state.date.getMonth():0, e.target.value-this.state.date.getFullYear())}>
                        {this.renderYears()}
                      </select>
                    </th>
                    <th
                      className={this.state.date.getFullYear()==2999&&this.state.date.getMonth()==11?'disabled':'enabled'}
                      onClick={()=>this.changeMonthAndYear(1)}>
                      <span>&#9654;</span>
                    </th>
                    <th onClick={()=>{
                        this.setState({selectedDate: undefined, showDatePicker: false, placeholder: ''})
                        this.props.onChange("")}}>
                        <span style={{color:'red', fontSize:'25px'}}>&#128465;</span>
                      </th>
                    </tr>
                    <tr style={{cursor:'default'}}>
                      {days.map(day=>{
                        return(
                          <th key={day}>
                            {day}
                          </th>
                        )
                      })}
                    </tr>
                    {
                      this.renderDates(this.state.date)
                    }
                  </tbody>
                </table>
              </div>
              <div
                onClick={()=>{
                  this.setState({
                    placeholder: '',
                    showDatePicker:false
                  })
                }}
                style={{position:'fixed', top:'0', left:'0', zIndex: '990', width:'100%', height:'100%'}}>
              </div>
            </div>
          }
        </div>
      )
    }
  }

  DatePicker.defaultProps = {
    label: '',
    onChange: ()=>{},
    limit: "",
    required: false,
    disabled: false
  }

  export default DatePicker;
