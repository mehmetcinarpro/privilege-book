import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useAsyncDebounce } from 'react-table';

interface GlobalFilterProps {
    globalFilter: string;
    setGlobalFilter: (value: string | undefined) => void;
}

export const GlobalFilter: React.FC<GlobalFilterProps> = ({
    globalFilter,
    setGlobalFilter
}) => {
  const [value, setValue] = useState(globalFilter);

  const handleChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined) // Set undefined to remove the filter entirely
  }, 200);
  
  const handleMouseDownSearchFilter = (
      event: React.MouseEvent<HTMLButtonElement>
  ) => {
      event.preventDefault();
  };
  const handleClickSearchFilter = () => {
      setValue("");
      setGlobalFilter("");
  };

  return (
    <Grid container justify="flex-end" alignItems="center">
        <Grid item>
            <FormControl>
                <OutlinedInput
                    id="searchText"
                    autoComplete="off"
                    placeholder="Search"
                    margin="dense"
                    value={value || ""}
                    onChange={(e) => {
                      setValue(e.target.value);
                      handleChange(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                size="small"
                                onClick={handleClickSearchFilter}
                                onMouseDown={handleMouseDownSearchFilter}
                            >
                                {globalFilter ? (
                                    <ClearIcon />
                                ) : (
                                        <SearchIcon />
                                    )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Grid>
    </Grid>
  )
}