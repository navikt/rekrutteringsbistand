import { Box, Button, ErrorMessage } from '@navikt/ds-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import IconBold from '../../../../public/editor/iconbold.svg';
import IconItalic from '../../../../public/editor/iconitalic.svg';
import IconList from '../../../../public/editor/iconlist.svg';
import IconRedo from '../../../../public/editor/iconredo.svg';
import IconUndo from '../../../../public/editor/iconundo.svg';
import styles from './RikTekstEditor.module.css';

export interface IRikTekstEditor {
    skjulToolbar?: boolean;
    tekst?: string;
    id: string;
    onChange: (tekst: string) => void;
    feilMelding?: string;
}

const RikTekstEditor: React.FC<IRikTekstEditor> = ({
    tekst,
    id,
    onChange,
    skjulToolbar,
    feilMelding,
}) => {
    const extensions = [
        StarterKit.configure({
            orderedList: false,
            blockquote: false,
            code: false,
            codeBlock: false,
            horizontalRule: false,
            strike: false,
        }),
    ];

    const editor = useEditor({
        extensions: extensions,
        content: tekst,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }
    return (
        <Box borderWidth="1" padding="4" borderRadius="xlarge">
            {!skjulToolbar && (
                <Box style={{ display: 'flex', gap: '0.5rem', marginBottom: '10px' }}>
                    <Button
                        type="button"
                        icon={<IconBold />}
                        variant={editor.isActive('bold') ? 'primary-neutral' : 'secondary-neutral'}
                        size="small"
                        onClick={() => editor.commands.toggleBold()}
                        aria-pressed={editor.isActive('bold')}
                    />
                    <Button
                        type="button"
                        icon={<IconItalic />}
                        variant={
                            editor.isActive('italic') ? 'primary-neutral' : 'secondary-neutral'
                        }
                        size="small"
                        onClick={() => editor.commands.toggleItalic()}
                        aria-pressed={editor.isActive('italic')}
                    />
                    <Button
                        type="button"
                        icon={<IconList />}
                        variant={
                            editor.isActive('bulletList') ? 'primary-neutral' : 'secondary-neutral'
                        }
                        size="small"
                        onClick={() => editor.commands.toggleBulletList()}
                        aria-pressed={editor.isActive('bulletList')}
                    />
                    <Button
                        type="button"
                        icon={<IconUndo />}
                        variant="secondary-neutral"
                        size="small"
                        onClick={() => editor.commands.undo()}
                    />
                    <Button
                        variant="secondary-neutral"
                        type="button"
                        icon={<IconRedo />}
                        size="small"
                        onClick={() => editor.commands.redo()}
                    />
                </Box>
            )}
            <hr />
            <EditorContent id={id} editor={editor} className={styles.editorContent} />
            {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
        </Box>
    );
};

export default RikTekstEditor;
