/* eslint-disable */
// TOOO: Corregir errores lint
import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Autocompleter, Suggester } from '@usig-gcba/autocompleter'
import { Box, Avatar, IconButton, InputBase, ListItemAvatar, ListItemText, MenuItem, Paper,  } from '@material-ui/core/'
import PlaceIcon from '@material-ui/icons/Place'
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'

import Downshift from 'downshift'

import useStyles from './styles'

const Seeker = (props) => {
  const classes = useStyles()
  const { getMapGL, onSelectItem } = props
  const map = getMapGL && getMapGL()
  // const [showSuggestions, setShowSuggestions] = useState(true);
  const showSuggestions = true
  const [inputValue, setInputValue] = useState('')
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  // const [sugerenciasVacias,setSugerenciasVacias]  = useState(false);
  // const [errorSugerencias, setErrorSugerencias] = useState(false);

  // Opciones de config del autocomplete
  const options = { maxSuggestions: 10, debug: false }
  const buscarDireccionesAmba = false

  // Callbacks del autocomplete
  const suggestionsCallback = (suggestions) => {
    setSuggestions(suggestions)
  }

  const completeSuggestionsCallback = (suggestions) => {
    console.log('completeSuggestionsCallback', suggestions)
    if (suggestions.length === 0) {
      // setSugerenciasVacias(true);
      setSuggestions([{
        data:{
          tipo: "tipoalerta"
        },
        title: "No se hallaron resultados coincidentes"
      }])
    }
  }

  const errorCallback = (/* error */) => {
    // Si ya hay sugerencias (por ejemplo de favoritos) no muestro el error
    if (suggestions.length === 0) {
      // setErrorSugerencias(error);
    }
  }

  const autocompleter = new Autocompleter(
    {
      onCompleteSuggestions: completeSuggestionsCallback,
      onSuggestions: suggestionsCallback,
      onError: errorCallback
    },
    options
  )

  function handleInputChange(event) {
    const text = event.target.value
    autocompleter.updateSuggestions(text)
    setInputValue(text)
  }

  function handleSelectItem(/* item */) {
    if (selectedSuggestion) {
      setInputValue(`${selectedSuggestion.title} `)
      if (selectedSuggestion.type === 'CALLE') {
        setInputValue(`${selectedSuggestion.title} `)
        setSuggestions([])
        // this.searchInput.focus()
      } else {
        //setInputValue('')
        // setShowSuggestions(false);
        setSuggestions([])

        // Geolocaliza el punto y envía la info a tooltip.js
        // que agrega el marker con el popup
        
          
      } 
      Promise.all(Suggester.getSuggestionPromises(selectedSuggestion))
        .then(_ => onSelectItem(selectedSuggestion))
    }
  }

  function handleInputFocus(/* event */) {}

  function handleInputBlur(/* event */) {
    setSuggestions([])
  }

  const renderInput = (inputProps) => {
    const {
      InputProps, classes, ref, ...other
    } = inputProps

    return (
      <InputBase
        className={classes.input}
        inputProps={{
          inputRef: ref,
          ...InputProps
        }}
        {...other}
      />
    )
  }

  const renderSuggestion = (suggestionProps) => {
    const {
      suggestion, index, itemProps, highlightedIndex
    } = suggestionProps

    const title = suggestion.alias || suggestion.title || suggestion.nombre
    const subTitle = suggestion.subTitle
      ? suggestion.subTitle
      : suggestion.descripcion
    const Icono = suggestion.title ? PlaceIcon : StarIcon

    const isHighlighted = highlightedIndex === index
    if (isHighlighted) {
      setSelectedSuggestion(suggestion)
    }

    return (
      <MenuItem
        {...itemProps}
        key={index}
        selected={isHighlighted}
        component="div"
        className={classes.list}
      >
        <ListItemAvatar>
          <Avatar>
            <Icono fontSize="small" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={subTitle} className={classes.listItem} />
      </MenuItem>
    )
  }

  autocompleter.addSuggester('Direcciones', { inputPause: 250 })
  autocompleter.addSuggester('Lugares')

  if (buscarDireccionesAmba) autocompleter.addSuggester('DireccionesAMBA')

  return (
    <div className="search-input-holder">
      <Downshift
        id="usig-autocomplete"
        inputValue={inputValue}
        onChange={handleSelectItem}
      > 
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          selectedItem
        }) => {
          const {
            onBlur, onFocus, onChange, ...inputProps
          } = getInputProps({
            placeholder: 'Buscar'
          })

          return (
            <div className={classes.container}>
              <Paper className={classes.root}>
                {renderInput({
                  classes,
                  inputProps,
                  onChange: handleInputChange,
                  onFocus: handleInputFocus,
                  onBlur: handleInputBlur
                })}
                
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                
              </Paper>

              <div {...getMenuProps()}>
                {showSuggestions ? (
                  suggestions.length !== 0 ? (
                    <Paper className={classes.paper} square>
                      {suggestions.map((suggestion, index) => renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.title }),
                        highlightedIndex,
                        selectedItem
                      }))}
                    </Paper>
                  ) : null
                ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>

      <div className={classes.divider} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  getMapGL: state.map.getMapGL
})

export default connect(mapStateToProps, null)(Seeker)
