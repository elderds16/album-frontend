import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, TextField, Button } from '@material-ui/core';

const AlbumForm = ({ album, onSubmit, showSaveButton, showUpdateButton, onRemove }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: album || { name: '', artist: '', imageUrl: '' },
    });

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Name"
                                variant="outlined"
                                {...field}
                                margin="normal"
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        name="artist"
                        control={control}
                        rules={{ required: 'Artist is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Artist"
                                variant="outlined"
                                {...field}
                                margin="normal"
                                fullWidth
                                error={!!errors.artist}
                                helperText={errors.artist?.message || ''}
                            />
                        )}
                    />
                    <Controller
                        name="imageUrl"
                        control={control}
                        rules={{ required: 'Image URL is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Image URL"
                                variant="outlined"
                                {...field}
                                margin="normal"
                                fullWidth
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl?.message || ''}
                            />
                        )}
                    />

                    {showSaveButton && (
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
                            Save
                        </Button>
                    )}
                    {showUpdateButton && (
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
                            Update
                        </Button>
                    )}
                    {onRemove && (
                        <Button variant="contained" color="secondary" onClick={onRemove}>
                            Remove
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default AlbumForm;
