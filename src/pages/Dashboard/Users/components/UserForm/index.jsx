import PropTypes from "prop-types";
import useUserFormViewModel from "./useUserFormViewModel";
export default function UserForm(props) {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isDirty,
    isSubmitting,
    roles,
  } = useUserFormViewModel(props.userId);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-1">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          type="text"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Nome"
          {...register("name")}
        />
        <span className="text-red-400">{errors.name?.message}</span>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-1 border rounded-lg outline-none"
          placeholder="Email"
          {...register("email")}
        />
        <span className="text-red-400">{errors.email?.message}</span>
      </div>

      {!props.userId && (
        <div className="flex flex-col gap-y-1">
          <label htmlFor="password">Senha</label>
          <input
            name="password"
            type="password"
            className="w-full px-3 py-1 border rounded-lg outline-none"
            placeholder="Senha"
            {...register("password")}
          />
          <span className="text-red-400">{errors.password?.message}</span>
        </div>
      )}

      <div className="flex flex-col gap-y-1">
        <label htmlFor="role">Cargo</label>
        <select
          name="role"
          className="w-full px-3 py-2 border rounded-lg outline-none"
          {...register("role")}
        >
          <option value="">Selecione um cargo</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <span className="text-red-400">{errors.role?.message}</span>
      </div>

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="w-full py-2 text-white rounded-lg mt-7 bg-primary disabled:bg-opacity-30 disabled:cursor-not-allowed"
      >
        {props.userId ? "Editar" : "Cadastrar"}
      </button>
    </form>
  );
}

UserForm.propType = {
  userId: PropTypes.string,
};
