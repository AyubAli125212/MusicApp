import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { HiPencil } from 'react-icons/hi';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateSongAsync } from '../redux/actions/songActions';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';
import { BeatLoader } from 'react-spinners';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto 10px auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled(Field)`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const UpdateIcon = styled(HiPencil)`
  margin-right: 5px;
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    artist: Yup.string().required('Artist is required'),
    genre: Yup.string().required('Genre is required'),
});

const SongUpdate = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [coverImagePreview, setCoverImagePreview] = useState(null);

    const songs = useSelector((state) => state.songs.songs);
    const song = songs.find((song) => song._id === id);
    const status = useSelector((state) => state.songs.status);
    const isLoading = useSelector((state) => state.songs.isLoading);

    useEffect(() => {
        if (song) {
            setCoverImagePreview(song.coverImage.secure_url);
        }
    }, [song])

    useEffect(() => {

        if (!isLoading && (status === 201 || status === 500)) {
            setIsSubmitting(false);
            navigate(-1);
        }
    }, [song, status, navigate, isLoading]);

    const handleSubmit = (values) => {
        const formData = new FormData();

        formData.append('id', id);
        formData.append('title', values.title);
        formData.append('artist', values.artist);
        formData.append('genre', values.genre);
        formData.append('coverImage', coverImage);
        formData.append('file', file);

        try {
            setIsSubmitting(true);

            dispatch(updateSongAsync(formData));

        } catch (error) {
            console.error('Error creating song:', error);
        }
    };

    const handleCoverImageChange = (event) => {
        const File = event.target.files[0];
        setCoverImage(File);
        setCoverImagePreview(URL.createObjectURL(File));
    };

    const handleSongFileChange = (event) => {
        const File = event.target.files[0];
        setFile(File);
    };

    return (
        <FormContainer>
            <h2>Update Song</h2>
            {song ? (
                <Formik
                    initialValues={{
                        title: song.title,
                        artist: song.artist,
                        genre: song.genre,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid }) => (
                        <Form>
                            <FormField>
                                <Label>Title</Label>
                                <Input type="text" name="title" />
                                <ErrorMessage name="title" component={ErrorText} />
                            </FormField>
                            <FormField>
                                <Label>Artist</Label>
                                <Input type="text" name="artist" />
                                <ErrorMessage name="artist" component={ErrorText} />
                            </FormField>
                            <FormField>
                                <Label>Genre</Label>
                                <Input type="text" name="genre" />
                                <ErrorMessage name="genre" component={ErrorText} />
                            </FormField>
                            <FormField>
                                <Label>Cover Image (PNG or JPG)</Label>
                                <Input type="file" accept=".png, .jpg, .jpeg" name="coverImage" onChange={handleCoverImageChange} />
                                {coverImagePreview && <img src={coverImagePreview} alt="Cover Preview" />}
                                <ErrorMessage name="coverImage" component={ErrorText} />
                            </FormField>
                            <FormField>
                                <Label>Song File (MP3)</Label>
                                <Input type="file" accept=".mp3" name="songFile" onChange={handleSongFileChange} />
                                <ErrorMessage name="songFile" component={ErrorText} />
                            </FormField>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >{!isSubmitting ? (
                                <>
                                    <UpdateIcon />
                                    Update
                                </>
                            ) : (
                                <PacmanLoader color="#fff" css={override} size={15} />
                            )}

                            </Button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <BeatLoader color="#fff" css={override} size={15} />
            )}
        </FormContainer>
    );
};

export default SongUpdate;
