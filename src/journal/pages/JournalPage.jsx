import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store"
import { useMemo } from "react"

export const JournalPage = () => {

  const { isSaving, active } = useSelector(state => state.journal);

  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>

      {
        (!!active) ? <NoteView /> : <NothingSelectedView />
      }

      <IconButton disabled={isSavingNote} onClick={onClickNewNote} size='large' sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.8 }, position: 'fixed', right: 50, bottom: 50 }}>
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
