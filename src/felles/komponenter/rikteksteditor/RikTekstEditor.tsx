import {
    ArrowRedoIcon,
    ArrowUndoIcon,
    BulletListIcon,
    ChevronRightDoubleIcon,
    LinkBrokenIcon,
    LinkIcon,
    NumberListIcon,
} from '@navikt/aksel-icons';
import { ErrorMessage, Loader } from '@navikt/ds-react';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import * as React from 'react';
import style from './RikTekstEditor.module.css';

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
    const [headerValue, setHeaderValue] = React.useState<number>(0);

    const editor = useEditor({
        extensions: [
            HardBreak,
            Document,
            Paragraph,
            Text,
            History,
            Bold,
            Italic,
            Underline,
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            Link.configure({
                openOnClick: false,
            }),
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
        ],
        content: tekst,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        onTransaction: ({ editor, transaction }) => {
            if (transaction.selection) {
                const level = editor.getAttributes('heading').level;
                setHeaderValue(level ? level : 0);
            }
        },
    });

    if (!editor) {
        return <Loader />;
    }

    const setLink = () => {
        const url = prompt('Skriv inn lenke');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const unsetLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    const onSelectHeading = (value: string) => {
        const level = parseInt(value, 10);

        if (level === 0) {
            editor.chain().focus().setParagraph().run();
        } else {
            // @ts-ignore
            editor.chain().focus().toggleHeading({ level }).run();
        }
    };

    return (
        <div className={style.editor} id={id}>
            <div>
                {skjulToolbar ? (
                    <div />
                ) : (
                    <div className={style.toolbar}>
                        <select
                            value={headerValue}
                            onChange={(e) => onSelectHeading(e.target.value)}
                        >
                            <option value={0}>Normal</option>
                            <option value={1}>H1</option>
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                            <option value={4}>H4</option>
                            <option value={5}>H5</option>
                        </select>
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={
                                editor.isActive('bold') ? style.aktivKnapp : style.inaktivKnapp
                            }
                        >
                            <strong>B</strong>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={
                                editor.isActive('italic') ? style.aktivKnapp : style.inaktivKnapp
                            }
                        >
                            <strong>
                                <i>I</i>
                            </strong>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={
                                editor.isActive('underline') ? style.aktivKnapp : style.inaktivKnapp
                            }
                        >
                            <strong>
                                <ins>U</ins>
                            </strong>
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={style.inaktivKnapp}
                        >
                            <ChevronRightDoubleIcon />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={
                                editor.isActive('bulletList')
                                    ? style.aktivKnapp
                                    : style.inaktivKnapp
                            }
                        >
                            <BulletListIcon />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={
                                editor.isActive('orderedList')
                                    ? style.aktivKnapp
                                    : style.inaktivKnapp
                            }
                        >
                            <NumberListIcon />
                        </button>
                        <button
                            onClick={setLink}
                            className={
                                editor.isActive('link') ? style.aktivKnapp : style.inaktivKnapp
                            }
                        >
                            <LinkIcon />
                        </button>
                        <button onClick={unsetLink} disabled={!editor.isActive('link')}>
                            <LinkBrokenIcon />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                        >
                            <ArrowUndoIcon />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                        >
                            <ArrowRedoIcon />
                        </button>
                    </div>
                )}
            </div>
            <EditorContent editor={editor} />
            {feilMelding && <ErrorMessage>{feilMelding}</ErrorMessage>}
        </div>
    );
};

export default RikTekstEditor;
