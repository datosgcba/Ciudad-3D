import React, { useState } from 'react'

import { Autocompleter, Suggester } from '@usig-gcba/autocompleter'
import {
  Box, Avatar, IconButton, InputBase, ListItemAvatar, ListItemText, ListItem, Paper
} from '@material-ui/core/'
import PlaceIcon from '@material-ui/icons/Place'
import SearchIcon from '@material-ui/icons/Search'
import StarIcon from '@material-ui/icons/Star'

import Downshift from 'downshift'

import PropTypes from 'prop-types'

import useStyles from './styles'

const Seeker = ({ onSelectItem }) => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [suggestions, setSuggestions] = useState([])

  // Opciones de config del autocomplete
  const options = { maxSuggestions: 10, debug: false }

  // Callbacks del autocomplete
  const suggestionsCallback = (s) => {
    setSuggestions(s)
  }

  const completeSuggestionsCallback = (sug) => {
    if (sug.length === 0) {
      setSuggestions([{
        data: {
          tipo: 'tipoalerta'
        },
        title: 'No se hallaron resultados coincidentes'
      }])
    }
  }

  const errorCallback = (/* error */) => {
    if (suggestions.length === 0) {
      // TODO: Añadir error
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

  const handleInputChange = (event) => {
    const text = event.target.value
    autocompleter.updateSuggestions(text)
    setInputValue(text)
  }

  const handleSelectItem = () => {
    if (selectedSuggestion) {
      setInputValue(`${selectedSuggestion.title} `)
      setSuggestions([])
      if (selectedSuggestion.type === 'CALLE') {
        setSuggestions([{
          data: {
            tipo: 'tipoalerta'
          },
          title: 'El origen indicado es una Calle, por lo tanto debe especificar la altura o bien un cruce para poder continuar con la búsqueda.'
        }])
      }
      Promise.all(Suggester.getSuggestionPromises(selectedSuggestion))
        .then(() => onSelectItem(selectedSuggestion))
    }
  }

  const handleInputBlur = () => {
    setSuggestions([])
  }

  const renderInput = (inputProps) => {
    const {
      InputProps, classes: StyleClass, ref, ...other
    } = inputProps

    return (
      <InputBase
        className={StyleClass.input}
        inputProps={{
          inputRef: ref,
          ...InputProps
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
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
      <ListItem
        // eslint-disable-next-line react/jsx-props-no-spreading
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
        <ListItemText primary={title} secondary={subTitle} />
      </ListItem>
    )
  }

  autocompleter.addSuggester('Direcciones', { inputPause: 250 })
  autocompleter.addSuggester('Lugares')
  autocompleter.addSuggester('Catastro')
  autocompleter.addSuggester('CatastroInformal')
  autocompleter.addSuggester('DireccionInformal')

  return (
    <Box>
      <Downshift
        id="usig-autocomplete"
        inputValue={inputValue}
        onSelect={handleSelectItem}
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
            <div>
              <Paper className={classes.root}>
                {renderInput({
                  classes,
                  inputProps,
                  onChange: handleInputChange,
                  onBlur: handleInputBlur
                })}
                <IconButton aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

              <Box
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getMenuProps()}
              >
                {suggestions.length !== 0 ? (
                  <Paper className={classes.paper} square>
                    {suggestions.map((suggestion, index) => renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.title }),
                      highlightedIndex,
                      selectedItem
                    }))}
                  </Paper>
                ) : null}
              </Box>
            </div>
          )
        }}
      </Downshift>
    </Box>
  )
}

Seeker.propTypes = {
  onSelectItem: PropTypes.func.isRequired
}

export default Seeker
